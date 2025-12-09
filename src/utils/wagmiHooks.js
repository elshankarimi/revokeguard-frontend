import { useAccount, useWriteContract } from 'wagmi';
import { useState, useCallback } from 'react';
import { config } from '../wagmi.config'; 

// --- ABI و قراردادها (مثال) ---
// شما باید از ABI استاندارد ERC20 برای توکن‌ها استفاده کنید.
const ERC20_ABI = [
  {
    "constant": true,
    "inputs": [{"name": "_owner", "type": "address"}, {"name": "_spender", "type": "address"}],
    "name": "allowance",
    "outputs": [{"name": "remaining", "type": "uint256"}],
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [{"name": "_spender", "type": "address"}, {"name": "_value", "type": "uint256"}],
    "name": "approve",
    "outputs": [{"name": "success", "type": "bool"}],
    "type": "function"
  }
];

// --- هوک سفارشی برای اسکن مجوزها (Approvals) ---
export function useCheckApprovals() {
    const { address, chain } = useAccount();
    const [approvals, setApprovals] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    // لیست نمونه از توکن‌ها برای بررسی
    const mockTokensToCheck = [
        { name: 'USDC', address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48' }, 
        // در یک برنامه واقعی، این لیست باید بر اساس chain.id فیلتر و پر شود
    ];
    
    // تابع اسکن که به صورت ناهمگام اجرا می‌شود
    const scanForApprovals = useCallback(async () => {
        if (!address || !chain) return;

        setIsLoading(true);
        setApprovals([]); 

        try {
            // دریافت کلاینت viem برای تعامل با بلاکچین
            const client = config.getClient({ chainId: chain.id });
            const tokenAddress = mockTokensToCheck[0].address;
            const spenderAddress = '0x1111111254EEB25477B68fb85Ed929f73A960582'; 

            // فراخوانی قرارداد (خواندن) با استفاده از client.readContract
            const allowance = await client.readContract({
                address: tokenAddress,
                abi: ERC20_ABI,
                functionName: 'allowance',
                args: [address, spenderAddress],
            });

            // اگر allowance از صفر بیشتر بود، آن را به لیست مجوزهای خطرناک اضافه کن
            if (allowance > 0n) { 
                setApprovals(prev => [...prev, {
                    token: mockTokensToCheck[0].name,
                    tokenAddress: tokenAddress,
                    spender: spenderAddress,
                    amount: allowance,
                    chain: chain.name
                }]);
            }

        } catch (error) {
            console.error('Approval scan failed:', error);
        } finally {
            setIsLoading(false);
        }
    }, [address, chain]);

    return { approvals, isLoading, scanForApprovals };
}


// --- هوک سفارشی برای لغو مجوز (Revoke) ---
export function useRevokeApproval() {
    // هوک writeContractAsync برای ارسال تراکنش‌های نوشتن به بلاکچین
    const { writeContractAsync } = useWriteContract();
    const [isRevoking, setIsRevoking] = useState(false);
    
    const revokeApproval = useCallback(async (approvalItem) => {
        setIsRevoking(true);
        try {
            // Revoke با فراخوانی تابع approve با مقدار 0n انجام می‌شود.
            const hash = await writeContractAsync({
                address: approvalItem.tokenAddress,
                abi: ERC20_ABI,
                functionName: 'approve',
                args: [approvalItem.spender, 0n], // 0n = BigInt zero in viem
            });

            alert(`Transaction sent! Hash: ${hash}`);
        } catch (error) {
            alert('Revoke failed or cancelled by user.');
            console.error('Revoke error:', error);
        } finally {
            setIsRevoking(false);
        }
    }, [writeContractAsync]);

    return { revokeApproval, isRevoking };
}
