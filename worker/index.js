// index.js (Cloudflare Worker) - RevokeGuard Worker Logic

export default {
    async fetch(request, env, ctx) {
        // CORS handling for frontend and Farcaster
        const origin = request.headers.get('Origin');
        const allowedOrigin = 'https://revokeguard-frontend.pages.dev';
        const headers = {
            'Access-Control-Allow-Origin': origin === allowedOrigin ? origin : allowedOrigin,
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
            'Content-Type': 'application/json'
        };

        // Preflight for CORS
        if (request.method === 'OPTIONS') {
            return new Response(null, { headers });
        }

        // Read Covalent API Key from Cloudflare env vars
        const COVALENT_KEY = env.COVALENT_KEY;
        if (!COVALENT_KEY) {
            return new Response(JSON.stringify({ error: "Covalent API Key is missing from Worker environment." }), { status: 500, headers });
        }

        // Route handling
        const url = new URL(request.url);

        // GET [/approvals](https://farcaster.xyz/~/channel/approvals)?wallet=0x...
        if (url.pathname === '[/approvals](https://farcaster.xyz/~/channel/approvals)' && request.method === 'GET') {
                           const walletAddress = url.searchParams.get('wallet');
            if (!walletAddress) {
                return new Response(JSON.stringify({ error: "Missing wallet address parameter." }), { status: 400, headers });
            }

            try {
                // TODO: Replace this mock with real Covalent (or ethers.js) API logic
                // Example:
                // const response = await fetch(`https://api.covalenthq.com/v1/chain_id/address/${walletAddress}/approvals/?key=${COVALENT_KEY}`);
                // const data = await response.json();

                // MOCK response for now:
                const mockData = {
                    message: "Successfully received request and Covalent key is available.",
                    worker: "revokeguard-worker",
                    wallet: walletAddress,
                    key_status: "Ready for Covalent API call"
                };

                return new Response(JSON.stringify(mockData), { status: 200, headers });
            } catch (error) {
                return new Response(JSON.stringify({ error: "Worker logic failed.", details: error.message }), { status: 500, headers });
            }
        }

        // Fallback for all other routes
        return new Response(
            JSON.stringify({ message: "Worker is running, but route not found." }),
            { status: 404, headers }
        );
    },
}; 
