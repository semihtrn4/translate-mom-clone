<<<<<<< HEAD
// Deno type definitions for better IDE experience
interface Deno {
  serve(handler: (req: Request) => Response | Promise<Response>): void;
  
  env: {
    get(key: string): string | undefined;
  }
}

// Declare Deno as a global variable
declare var Deno: Deno;
=======
// Type definitions for Deno APIs used in Supabase Edge Functions
// This file provides basic type definitions to resolve TypeScript errors

declare global {
  interface Deno {
    env: {
      get(key: string): string | undefined;
    };
    serve(handler: (req: Request) => Promise<Response>): void;
  }
  
  const Deno: Deno;
}

export {};
>>>>>>> 208b8da (supabase error)
