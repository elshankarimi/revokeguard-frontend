// This is the core Worker logic for RevokeGuard.
// It handles CORS, reads the Covalent API Key, and routes requests.

// Define the function that processes all incoming requests.
export default {
    async fetch(request, env, ctx) {
        
        // --- 1. CORS Preflight Handling (Crucial for Pages to Worker communication) ---
        // Cloudflare Pages (revokeguard-frontend) is on a different subdomain/domain than the Worker.
        // We must allow cross-origin requests.
        const origin = request.headers.get('Origin');
        const allowedOrigin = 'https://revokeguard-frontend.pages.dev'; // Replace with your actual Pages domain/subdomain if needed
        
        const headers = {
            'Access-Control-Allow-Origin': origin === allowedOrigin ? origin : allowedOrigin,
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
            'Content-Type': 'application/json'
        };

        if (request.method === 'OPTIONS') {
            // Handle preflight requests
            return new Response(null, { headers });
        }

        // --- 2. API Key Access ---
        // Read the Covalent API Key from the environment variables defined in GitHub Actions/wrangler.toml
        const COVALENT_KEY = env.COVALENT_KEY;
        if (!COVALENT_KEY) {
            return new Response(JSON.stringify({ error: "Covalent API Key is missing from Worker environment." }), { status: 500, headers });
        }
        
        // --- 3. Request Routing and Logic ---
        const url = new URL(request.url);
        
        // Example: Handle the main request for fetching approvals
        if (url.pathname === '/approvals' && request.method === 'GET') {
            const walletAddress = url.searchParams.get('wallet');
            
            if (!walletAddress) {
                return new Response(JSON.stringify({ error: "Missing wallet address parameter." }), { status: 400, headers });
            }

            // --- Your Core Logic Goes Here ---
            // For now, this is a placeholder. You will replace this with the actual Covalent/Ethers logic.

            // Example of using the Covalent Key:
            // const covalentApiUrl = `https://api.covalenthq.com/v1/chain_id/address/${walletAddress}/approvals/?key=${COVALENT_KEY}`;
            
            try {
                // Simulate fetching data (replace with actual fetch to Covalent)
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

        // Default response for unhandled routes
        return new Response(JSON.stringify({ message: "Worker is running, but route not found." }), { status: 404, headers });
    },
};
