// worker/index.js - RevokeGuard Backend Worker
import { Router } from 'itty-router';
import { handleWebhook, getApprovals, revokeApproval } from './handlers';

const router = Router();

// Middleware to set headers (CORS)
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

// Handle CORS preflight requests
router.options('*', () => new Response(null, { headers: corsHeaders }));

router.get('/approvals', getApprovals);
router.post('/revoke', revokeApproval);
router.post('/webhook', handleWebhook); // Real-time data from Indexer

router.all('*', () => new Response('Not Found', { status: 404 }));

export default {
  async fetch(request, env, ctx) {
    // Add CORS headers to all responses
    const response = await router.handle(request, env, ctx);
    
    // Apply CORS headers if not already set
    if (!response.headers.has('Access-Control-Allow-Origin')) {
      for (const [key, value] of Object.entries(corsHeaders)) {
        response.headers.set(key, value);
      }
    }
    return response;
  },
};
