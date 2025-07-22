import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Loader2 } from 'lucide-react';

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  variant?: 'default' | 'minimal' | 'branded';
  message?: string;
  fullScreen?: boolean;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'medium',
  variant = 'default',
  message = 'Loading...',
  fullScreen = false
}) => {
  const sizeClasses = {
    small: 'w-6 h-6',
    medium: 'w-8 h-8',
    large: 'w-12 h-12'
  };

  const containerClasses = fullScreen 
    ? 'fixed inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-50'
    : 'flex items-center justify-center p-8';

  // Default spinning loader
  if (variant === 'minimal') {
    return (
      <div className={containerClasses}>
        <Loader2 className={`${sizeClasses[size]} animate-spin text-primary-600`} />
      </div>
    );
  }

  // Branded loader with logo
  if (variant === 'branded') {
    return (
      <div className={containerClasses}>
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="inline-block mb-4"
          >
            <Code2 className="w-12 h-12 text-primary-600" />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-lg font-semibold text-secondary-800 mb-2">
              Loading Portfolio
            </h3>
            <div className="flex items-center justify-center space-x-1">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 1, 0.5]
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    delay: i * 0.2
                  }}
                  className="w-2 h-2 bg-primary-600 rounded-full"
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  // Default loader with progress animation
  return (
    <div className={containerClasses}>
      <div className="text-center">
        {/* Main spinner */}
        <div className="relative inline-block mb-4">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 border-4 border-primary-200 border-t-primary-600 rounded-full"
          />
          
          {/* Inner pulse */}
          <motion.div
            animate={{ 
              scale: [1, 1.1, 1],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-2 bg-primary-100 rounded-full"
          />
        </div>

        {/* Loading text with typewriter effect */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-2"
        >
          <h3 className="text-lg font-medium text-secondary-800">
            {message}
          </h3>
          
          {/* Progress dots */}
          <div className="flex justify-center space-x-1">
            {[0, 1, 2, 3].map((i) => (
              <motion.div
                key={i}
                animate={{
                  y: [0, -8, 0],
                }}
                transition={{
                  duration: 0.6,
                  repeat: Infinity,
                  delay: i * 0.1,
                  ease: "easeInOut"
                }}
                className="w-1.5 h-1.5 bg-primary-600 rounded-full"
              />
            ))}
          </div>
        </motion.div>

        {/* Optional progress bar */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 3, repeat: Infinity }}
          className="mt-6 h-1 bg-primary-600 rounded-full max-w-xs mx-auto"
        />
      </div>
    </div>
  );
};

// Skeleton loader for specific sections
export const SkeletonLoader: React.FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <div className={`animate-pulse ${className}`}>
      <div className="space-y-4">
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
      </div>
    </div>
  );
};

// Card skeleton for project/blog cards
export const CardSkeleton: React.FC = () => {
  return (
    <div className="card p-6 animate-pulse">
      <div className="w-full h-48 bg-gray-200 rounded-lg mb-4"></div>
      <div className="space-y-3">
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        <div className="flex space-x-2">
          <div className="h-6 bg-gray-200 rounded w-16"></div>
          <div className="h-6 bg-gray-200 rounded w-20"></div>
        </div>
      </div>
    </div>
  );
};

// Page loading overlay
export const PageLoader: React.FC<{ isLoading: boolean }> = ({ isLoading }) => {
  if (!isLoading) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-white z-50 flex items-center justify-center"
    >
      <LoadingSpinner variant="branded" fullScreen />
    </motion.div>
  );
};

export default LoadingSpinner;