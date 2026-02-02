import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

// ShipStation API integration for shipping management
class ShippingService {
  private shipStationApi;
  
  constructor() {
    this.shipStationApi = axios.create({
      baseURL: 'https://ssapi.shipstation.com',
      auth: {
        username: process.env.SHIPSTATION_API_KEY!,
        password: process.env.SHIPSTATION_API_SECRET!
      },
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  // Get shipping rates for checkout
  async getShippingRates(orderData: {
    toAddress: {
      name: string;
      street1: string;
      street2?: string;
      city: string;
      state: string;
      postalCode: string;
      country: string;
    };
    items: Array<{
      sku: string;
      quantity: number;
      weight: number;
    }>;
  }) {
    try {
      // Calculate total weight
      const totalWeight = orderData.items.reduce(
        (sum, item) => sum + (item.weight * item.quantity), 0
      );

      // Get rates from multiple carriers
      const ratesResponse = await this.shipStationApi.post('/shipments/getrates', {
        carrierCode: 'stamps_com', // or 'fedex', 'ups', etc.
        fromPostalCode: process.env.SHIP_FROM_ZIP || '90210',
        toState: orderData.toAddress.state,
        toPostalCode: orderData.toAddress.postalCode,
        toCountry: orderData.toAddress.country,
        weight: {
          value: Math.max(totalWeight, 1), // Minimum 1 oz
          units: 'ounces'
        },
        dimensions: {
          units: 'inches',
          length: 12,
          width: 9,
          height: 6
        }
      });

      return ratesResponse.data;
    } catch (error) {
      console.error('Shipping rates error:', error);
      
      // Fallback flat rates if API fails
      return [
        {
          serviceName: 'Standard Shipping',
          serviceCode: 'standard',
          shipmentCost: 5.99,
          otherCost: 0
        },
        {
          serviceName: 'Express Shipping',
          serviceCode: 'express',
          shipmentCost: 12.99,
          otherCost: 0
        }
      ];
    }
  }

  // Create shipping label after order is paid
  async createShipment(orderData: {
    orderId: string;
    orderNumber: string;
    orderDate: string;
    orderStatus: string;
    customerEmail: string;
    billTo: any;
    shipTo: any;
    items: any[];
    amountPaid: number;
    shippingAmount: number;
    carrierCode: string;
    serviceCode: string;
  }) {
    try {
      const shipmentResponse = await this.shipStationApi.post('/orders/createorder', {
        orderNumber: orderData.orderNumber,
        orderDate: orderData.orderDate,
        orderStatus: 'awaiting_shipment',
        customerUsername: orderData.customerEmail,
        customerEmail: orderData.customerEmail,
        billTo: orderData.billTo,
        shipTo: orderData.shipTo,
        items: orderData.items.map(item => ({
          lineItemKey: item.id,
          sku: item.sku,
          name: item.name,
          quantity: item.quantity,
          unitPrice: item.price,
          weight: {
            value: item.weight || 4, // Default 4 oz if no weight
            units: 'ounces'
          }
        })),
        amountPaid: orderData.amountPaid,
        shippingAmount: orderData.shippingAmount,
        requestedShippingService: orderData.serviceCode,
        carrierCode: orderData.carrierCode,
        serviceCode: orderData.serviceCode
      });

      // Create shipping label
      const labelResponse = await this.shipStationApi.post('/orders/createlabelfororder', {
        orderId: shipmentResponse.data.orderId,
        carrierCode: orderData.carrierCode,
        serviceCode: orderData.serviceCode,
        testLabel: process.env.NODE_ENV === 'development'
      });

      return {
        shipmentId: shipmentResponse.data.orderId,
        trackingNumber: labelResponse.data.trackingNumber,
        labelUrl: labelResponse.data.labelData,
        shipDate: labelResponse.data.shipDate
      };

    } catch (error) {
      console.error('Shipment creation error:', error);
      throw error;
    }
  }

  // Track shipment
  async trackShipment(trackingNumber: string, carrierCode: string) {
    try {
      const trackingResponse = await this.shipStationApi.get(
        `/shipments?trackingNumber=${trackingNumber}&carrierCode=${carrierCode}`
      );
      
      return trackingResponse.data;
    } catch (error) {
      console.error('Tracking error:', error);
      return null;
    }
  }
}

const shippingService = new ShippingService();

// API Routes
export async function POST(request: NextRequest) {
  const { action, ...data } = await request.json();

  try {
    switch (action) {
      case 'getRates':
        const rates = await shippingService.getShippingRates(data);
        return NextResponse.json({ rates });

      case 'createShipment':
        const shipment = await shippingService.createShipment(data);
        return NextResponse.json({ shipment });

      case 'trackShipment':
        const tracking = await shippingService.trackShipment(
          data.trackingNumber, 
          data.carrierCode
        );
        return NextResponse.json({ tracking });

      default:
        return NextResponse.json(
          { error: 'Invalid action' }, 
          { status: 400 }
        );
    }
  } catch (error: any) {
    console.error('Shipping API error:', error);
    return NextResponse.json(
      { error: error.message || 'Shipping service error' },
      { status: 500 }
    );
  }
}