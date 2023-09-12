import { useContractRead } from 'wagmi'; 
import { _abi, _abiAddress } from './abiGet'; 

export function BatchSupply(batch) {
    const { data, isError, isLoading } = useContractRead({
        address: _abiAddress,
        abi: _abi,
        functionName: 'tokenNextToMintInBatch',
        args: [batch],
    });

    return data;
}

export function BatchCost(batch, _sender) {
    const { data, isError, isLoading } = useContractRead({
        address: _abiAddress,
        abi: _abi,
        functionName: '_cost',
        args: [batch, false, 0],
        account: _sender,
    });

    return data;
}

export function GetRoll(_id) {
    const { data, isError, isLoading } = useContractRead({
        address: _abiAddress,
        abi: _abi,
        functionName: 'roll',
        args: [_id],
    });

    return data;
}

export function SwapCost(batch, _sender) {
    const { data, isError, isLoading } = useContractRead({
        address: _abiAddress,
        abi: _abi,
        functionName: 'rollCost',
        args: [batch],
    });

    if (AdminCheck(_sender)) {
        return 0;
    }

    return data;
}

export function IsHolder(_sender, _id) {
    const { data, isError, isLoading } = useContractRead({
        address: _abiAddress,
        abi: _abi,
        functionName: 'balanceOf',
        args: [_sender, _id],
    });

    return data;
}

export function Exists(_id) {
    const { data, isError, isLoading } = useContractRead({
        address: _abiAddress,
        abi: _abi,
        functionName: 'exists',
        args: [_id],
    });

    return data;
}

export function AdminCheck(_sender) {
    const { data, isError, isLoading } = useContractRead({
        address: _abiAddress,
        abi: _abi,
        functionName: 'checkIfAdmin',
        args: [],
        account: _sender,
    });

    return data;
}

export async function GetMetadata(_id) {
    const { data: uri, isError, isLoading } = useContractRead({
        address: _abiAddress,
        abi: _abi,
        functionName: 'uri',
        args: [_id],
    });

    if (isError || isLoading) {
        return null;
    }

    try {
        const response = await fetch(uri);
        const json = await response.json();

        if (json.image) {
            return json.image; // Return the image URI from the JSON
        } else {
            return null; // JSON does not contain image key
        }
    } catch (error) {
        console.error('Error fetching JSON metadata:', error);
        return null;
    }
}