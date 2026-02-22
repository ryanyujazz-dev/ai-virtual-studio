'use client';

import React from 'react';
import { cn } from '../../lib/utils';

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'image' | 'button' | 'card' | 'circle';
  width?: string | number;
  height?: string | number;
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'full';
}

export function Skeleton({
  className,
  variant = 'text',
  width,
  height,
  rounded = 'md',
}: SkeletonProps) {
  const baseClasses = 'animate-pulse bg-zinc-800';

  const variantClasses = {
    text: 'h-4',
    image: 'aspect-video',
    button: 'h-10',
    card: 'h-40',
    circle: 'rounded-full',
  };

  const roundedClasses = {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    full: 'rounded-full',
  };

  const style: React.CSSProperties = {};
  if (width) style.width = typeof width === 'number' ? `${width}px` : width;
  if (height) style.height = typeof height === 'number' ? `${height}px` : height;

  return (
    <div
      className={cn(
        baseClasses,
        variantClasses[variant],
        roundedClasses[rounded],
        variant === 'circle' ? '' : roundedClasses[rounded],
        className
      )}
      style={style}
    />
  );
}

// Skeleton组合组件
export function SkeletonText({
  lines = 3,
  className,
  ...props
}: Omit<SkeletonProps, 'variant'> & { lines?: number }) {
  return (
    <div className={cn('space-y-2', className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          variant="text"
          width={i === lines - 1 ? '70%' : '100%'}
          {...props}
        />
      ))}
    </div>
  );
}

export function SkeletonCard({ className, ...props }: Omit<SkeletonProps, 'variant'>) {
  return (
    <div className={cn('space-y-3', className)}>
      <Skeleton variant="image" {...props} />
      <div className="space-y-2">
        <Skeleton variant="text" width="80%" />
        <Skeleton variant="text" width="60%" />
      </div>
    </div>
  );
}

export function SkeletonButton({ className, ...props }: Omit<SkeletonProps, 'variant'>) {
  return <Skeleton variant="button" className={cn('w-full', className)} {...props} />;
}