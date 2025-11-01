
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { RefreshCw, Check, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { setDeepLApiKey, testDeepLConnection } from "@/services/translation/translationService";

// Create a state for the API key dialog visibility that can be accessed from outside
let isApiKeyDialogOpenState = false;
let setIsApiKeyDialogOpenFunction: (value: boolean) => void = () => {};

export const setIsApiKeyDialogOpen = (value: boolean) => {
  isApiKeyDialogOpenState = value;
  setIsApiKeyDialogOpenFunction(value);
};

interface ApiKeyDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const ApiKeyDialog: React.FC<ApiKeyDialogProps> = ({ isOpen, onOpenChange }) => {
  const [apiKey, setApiKey] = useState("585cfc6c-ff54-47cd-a2c3-3e8e449e559d"); // Pre-set the API key
  const [isTestingConnection, setIsTestingConnection] = useState(false);
  const [connectionTestResult, setConnectionTestResult] = useState<boolean | null>(null);
  const { toast } = useToast();
  
  // Store the setter function in our module-level variable
  useEffect(() => {
    setIsApiKeyDialogOpenFunction = onOpenChange;
  }, [onOpenChange]);

  // Load saved API key when dialog opens
  useEffect(() => {
    if (isOpen) {
      const savedKey = localStorage.getItem('deepl_api_key');
      if (savedKey) {
        setApiKey(savedKey);
      }
    }
  }, [isOpen]);

  const handleApiKeySave = async () => {
    if (apiKey.trim()) {
      setDeepLApiKey(apiKey.trim());
      
      // Test the connection with the new API key
      setIsTestingConnection(true);
      try {
        const connectionSuccessful = await testDeepLConnection();
        setConnectionTestResult(connectionSuccessful);
        
        if (connectionSuccessful) {
          toast({
            title: "API Key Saved",
            description: "Your DeepL API key has been saved and tested successfully."
          });
          setTimeout(() => onOpenChange(false), 1500);
        } else {
          toast({
            title: "API Key Saved",
            description: "Your DeepL API key has been saved, but the connection test failed.",
            variant: "destructive"
          });
        }
      } catch (error) {
        setConnectionTestResult(false);
        toast({
          title: "Connection Test Failed",
          description: "Could not test the API key. Please ensure it's valid.",
          variant: "destructive"
        });
      } finally {
        setIsTestingConnection(false);
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && apiKey.trim()) {
      handleApiKeySave();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Enter DeepL API Key</DialogTitle>
          <DialogDescription>
            You can get your DeepL API key by signing up at <a href="https://www.deepl.com/pro-api" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">deepl.com</a>
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Input
            placeholder="API Key"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            onKeyDown={handleKeyPress}
            type="password"
          />
          
          {connectionTestResult !== null && (
            <Alert variant={connectionTestResult ? "default" : "destructive"}>
              <AlertDescription className="flex items-center gap-2">
                {connectionTestResult 
                  ? <><Check size={16} className="text-green-500" /> API connection successful</>
                  : <><AlertCircle size={16} /> API connection failed. Please check your API key</>
                }
              </AlertDescription>
            </Alert>
          )}
        </div>
        <DialogFooter>
          <Button onClick={() => onOpenChange(false)} variant="outline">Cancel</Button>
          <Button 
            onClick={handleApiKeySave} 
            disabled={isTestingConnection || !apiKey.trim()}
          >
            {isTestingConnection ? <RefreshCw className="animate-spin mr-2" size={16} /> : null}
            {isTestingConnection ? "Testing..." : "Save API Key"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ApiKeyDialog;
