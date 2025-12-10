import { useAccount, useWriteContract } from 'wagmi';
import { useState, useCallback } from 'react';
import { config } from '..[/wagmi](https://farcaster.xyz/~/channel/wagmi).config';

// ABI استاندارد ERC20
const ERC20_ABI = [
  {
    constant: true,
    inputs: [
      { name: '_owner', type: 'address' },
      { name: '_spender', type: 'address' }
    ],
    name: 'allowance',
    outputs: [{ name: 'remaining', type: 'uint256' }],
    type: 'function'
  },
  {
    constant: false,
    inputs: [
      { name: '_spender', type: 'address' },
      { name: '_value', type: 'uint256' }
    ],
    name: 'approve',
    outputs: [{ name: 'success', type: 'bool' }],
    type: 'function'
  }
];

// --- هوک اسکن مجوزها (Approvals) ---
export function useCheckApprovals() {
  const { address, chain } = useAccount();
  const [approvals, setApprovals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // توکن‌ها و اسپندرهای واقعی پروژه خودت را اینجا قرار بده
  const tokensToCheck = [
    {
      name: 'USDC',
      address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
      riskySpender: '0x1111111254EEB25477B68fb85Ed929f73A960582'
    }
    // توکن‌های بیشتر را همینجا اضافه کن
  ];

  const scanForApprovals = useCallback(async () => {
    if (!address || !chain) return;
    setIsLoading(true);
    setApprovals([]);

    try {
      const client = config.getClient({ chainId: chain.id });
      for (const t of tokensToCheck) {
        const allowance = await client.readContract({
          address: t.address,
          abi: ERC20_ABI,
          functionName: 'allowance',
          args: [address, t.riskySpender]
        });

        if (allowance > 0n) {
          setApprovals(prev => [
            ...prev,
            {
              token: t.name,
              tokenAddress: t.address,
              spender: t.riskySpender,
              amount: allowance,
              chain: chain.name
            }
          ]);
        }
      }
    } catch (error) {
      console.error('Approval scan failed:', error);
    } finally {
      setIsLoading(false);
    }
  }, [address, chain]);

  return { approvals, isLoading, scanForApprovals };
}

// --- هوک لغو مجوز (Revoke) ---
export function useRevokeApproval() {
  const { writeContractAsync } = useWriteContract();
  const [isRevoking, setIsRevoking] = useState(false);

  const revokeApproval = useCallback(async (approvalItem) => {
    setIsRevoking(true);
    try {
      // فراخوانی approve با مقدار 0 (لغو مجوز spender)
      const hash = await writeContractAsync({
        address: approvalItem.tokenAddress,
        abi: ERC20_ABI,
        functionName: 'approve',
        args: [approvalItem.spender, 0n]
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
