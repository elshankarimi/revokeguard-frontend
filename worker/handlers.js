// worker/handlers.js - Main logic for Cloudflare Worker

// --- 1. Historical Approval Scanner (Covalent) ---
export async function getApprovals(request, env) {
    const url = new URL(request.url);
    const address = url.searchParams.get('address');

    if (!address) {
        return new Response(JSON.stringify({ error: 'Missing wallet address' }), { status: 400 });
    }

    try {
        // TODO: For production, uncomment below and implement fetching from Covalent
        // const chainId = ...;
        // const covalentUrl = `https://api.covalenthq.com/v1/${chainId}/address/${address}/approvals/?key=${env.COVALENT_KEY}`;
        // const response = await fetch(covalentUrl);
        // const data = await response.json();

        // Mock data for now
        const mockData = {
            approvals: [
                { tokenName: "USDC", contract: "0xA0b8...eB48", spender: "0x1234...RevokeRisk", amount: "Unlimited" },
                { tokenName: "LINK", contract: "0x5149...c1f5", spender: "0x5678...Uniswap", amount: "Limited" }
            ]
        };

        return new Response(JSON.stringify(mockData), {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        });
    } catch (e) {
                return new Response(JSON.stringify({ error: 'Failed to fetch approvals', details: e.message }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        });
    }
}

// --- 2. Transaction Revoke (Placeholder for future server-side logic) ---
export async function revokeApproval(request, env) {
    // In future versions, implement server-side logic for gasless or meta-tx revocation here
    return new Response(
        JSON.stringify({ message: 'Revoke request acknowledged. Processing on client side.' }),
        {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        }
    );
}

// --- 3. Real-time Webhook Handler ---
export async function handleWebhook(request, env) {
    if (request.method !== 'POST') {
        return new Response('Method Not Allowed', { status: 405 });
    }

    // Example placeholder for real webhook parsing
    // const payload = await request.json();
    // if (payload.event && payload.event.name === 'Approval') {
    //     await sendPushNotification(payload.event.data.owner, "New High-Risk Approval Detected!");
    // }

    return new Response('Webhook received and processed.', {
        status: 200,
        headers: {
            'Content-Type': 'text/plain',
            'Access-Control-Allow-Origin': '*'
        }
    });
}

// --- 4. Push Notification Sender (log only for now) ---
async function sendPushNotification(userAddress, message) {
    // NOTE: This is a stub. Implement web push or external service as needed.
    console.log(`[PUSH NOTIFICATION] Alert for ${userAddress}: ${message}`);
}
