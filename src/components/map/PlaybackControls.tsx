import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Play, Pause, SkipBack, SkipForward } from 'lucide-react';
import { format } from 'date-fns';

interface PlaybackControlsProps {
  isPlaying: boolean;
  currentIndex: number;
  maxIndex: number;
  playbackSpeed: number;
  currentTimestamp?: string;
  onPlayPause: () => void;
  onSliderChange: (value: number[]) => void;
  onSpeedChange: (speed: number) => void;
  onSkipBack: () => void;
  onSkipForward: () => void;
}

export default function PlaybackControls({
  isPlaying,
  currentIndex,
  maxIndex,
  playbackSpeed,
  currentTimestamp,
  onPlayPause,
  onSliderChange,
  onSpeedChange,
  onSkipBack,
  onSkipForward,
}: PlaybackControlsProps) {
  const speedOptions = [1, 2, 5];

  return (
    <Card className="w-full">
      <CardContent className="p-4 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="icon"
              onClick={onSkipBack}
              disabled={currentIndex === 0}
            >
              <SkipBack className="h-4 w-4" />
            </Button>
            <Button
              variant="default"
              size="icon"
              onClick={onPlayPause}
            >
              {isPlaying ? (
                <Pause className="h-4 w-4" />
              ) : (
                <Play className="h-4 w-4" />
              )}
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={onSkipForward}
              disabled={currentIndex >= maxIndex}
            >
              <SkipForward className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-sm text-muted-foreground">Speed:</span>
            {speedOptions.map((speed) => (
              <Button
                key={speed}
                variant={playbackSpeed === speed ? 'default' : 'outline'}
                size="sm"
                onClick={() => onSpeedChange(speed)}
              >
                ×{speed}
              </Button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Slider
            value={[currentIndex]}
            max={maxIndex}
            step={1}
            onValueChange={onSliderChange}
            className="w-full"
          />
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>
              {currentIndex + 1} / {maxIndex + 1}
            </span>
            {currentTimestamp && (
              <span>
                {format(new Date(currentTimestamp), 'PPp')}
              </span>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
