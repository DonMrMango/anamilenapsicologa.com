'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'

interface HighlightStory {
  id: string
  title: string
  icon: string
  coverImage: string
  itemCount: number
}

interface HighlightStoriesProps {
  stories: HighlightStory[]
  onSelectStory: (storyId: string) => void
}

export default function HighlightStories({ stories, onSelectStory }: HighlightStoriesProps) {
  const [hoveredStory, setHoveredStory] = useState<string | null>(null)

  const getIconEmoji = (icon: string) => {
    const emojis: Record<string, string> = {
      psychology: '🧠',
      couple: '💑',
      family: '👨‍👩‍👧‍👦',
      wellness: '🧘',
      education: '📚',
      relationships: '🤝',
      love: '❤️',
      inspiration: '✨',
      goals: '🎯',
      growth: '🌱'
    }
    
    return emojis[icon] || '📁'
  }

  if (stories.length === 0) {
    return null
  }

  return (
    <div className="w-full overflow-x-auto py-6 no-scrollbar">
      <div className="flex space-x-4 px-4 md:px-0 min-w-max">
        {stories.map((story) => (
          <motion.div
            key={story.id}
            className="flex flex-col items-center"
            whileHover={{ scale: 1.05 }}
            onHoverStart={() => setHoveredStory(story.id)}
            onHoverEnd={() => setHoveredStory(null)}
            onClick={() => onSelectStory(story.id)}
          >
            <div className="relative cursor-pointer mb-2">
              {/* Outer circle */}
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-accent-rose p-0.5">
                {/* Inner circle with image */}
                <div className="w-full h-full rounded-full overflow-hidden border-2 border-white">
                  <Image 
                    src={story.coverImage || '/images/default-highlight.jpg'} 
                    alt={story.title}
                    width={74}
                    height={74}
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>
              
              {/* Icon badge */}
              <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-white flex items-center justify-center shadow-sm">
                <span className="text-sm">{getIconEmoji(story.icon)}</span>
              </div>
              
              {/* Hover tooltip */}
              {hoveredStory === story.id && (
                <motion.div 
                  className="absolute -bottom-14 left-1/2 transform -translate-x-1/2 bg-white shadow-md rounded-lg px-3 py-2 text-sm z-10 w-32 text-center"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {story.itemCount} elemento{story.itemCount !== 1 ? 's' : ''}
                </motion.div>
              )}
            </div>
            
            <span className="text-xs text-center font-medium truncate w-20">
              {story.title}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  )
}