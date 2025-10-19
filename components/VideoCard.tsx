'use client';

import { motion } from 'framer-motion';
import { Card } from './ui/card';
import { PlayCircle } from 'lucide-react';
import { type YouTubeVideo } from '@/lib/youtube';

interface VideoCardProps {
  video: YouTubeVideo;
}

export function VideoCard({ video }: VideoCardProps) {
  const handleClick = () => {
    window.open(`https://www.youtube.com/watch?v=${video.id}`, '_blank');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
    >
      <Card
        className="overflow-hidden cursor-pointer group"
        onClick={handleClick}
      >
        {/* Thumbnail */}
        <div className="relative aspect-video">
          <img
            src={video.thumbnailUrl}
            alt={video.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <PlayCircle className="w-12 h-12 text-white" />
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="font-medium line-clamp-2 mb-1 group-hover:text-blue-600 transition-colors">
            {video.title}
          </h3>
          <p className="text-sm text-muted-foreground">{video.channelTitle}</p>
        </div>
      </Card>
    </motion.div>
  );
}