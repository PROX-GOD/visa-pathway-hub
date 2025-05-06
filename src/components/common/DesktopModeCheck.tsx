
import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Monitor, Smartphone, RefreshCw } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const DesktopModeCheck = () => {
  const isMobile = useIsMobile();
  const [showDialog, setShowDialog] = useState(false);
  
  useEffect(() => {
    if (isMobile) {
      const hasSeenWarning = sessionStorage.getItem('desktop-mode-warning');
      if (!hasSeenWarning) {
        setShowDialog(true);
        sessionStorage.setItem('desktop-mode-warning', 'true');
      }
    }
  }, [isMobile]);
  
  const handleRefresh = () => {
    window.location.reload();
  };
  
  if (!isMobile) {
    return null;
  }
  
  return (
    <>
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-xl font-serif">
              <Smartphone className="h-5 w-5 text-visa-blue" />
              Desktop Mode Required
            </DialogTitle>
          </DialogHeader>
          
          <div className="py-4">
            <p className="mb-4 text-gray-600">
              For the best experience, please switch to desktop mode in your browser settings.
            </p>
            
            <div className="space-y-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-medium text-visa-navy mb-2">How to enable desktop mode:</h3>
                <ol className="list-decimal list-inside space-y-2 text-gray-700">
                  <li>Open your browser menu (usually three dots in the corner)</li>
                  <li>Look for "Desktop site" or "Request desktop site" option</li>
                  <li>Enable that option</li>
                  <li>Refresh this page</li>
                </ol>
              </div>
              
              <Button 
                className="w-full bg-visa-blue hover:bg-visa-navy flex items-center justify-center gap-2"
                onClick={handleRefresh}
              >
                <RefreshCw className="h-4 w-4" />
                I've Enabled Desktop Mode (Refresh)
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      
      <div className="fixed bottom-0 left-0 right-0 bg-visa-navy text-white py-2 px-4 text-center text-sm z-50">
        <div className="flex items-center justify-center gap-2">
          <Monitor className="h-4 w-4" />
          <span>Please use desktop mode for the best experience</span>
        </div>
      </div>
    </>
  );
};

export default DesktopModeCheck;
