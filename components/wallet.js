import { useMetaMask } from "metamask-react";
import { Button, Image } from "semantic-ui-react";
import Identicon from "identicon.js";

export default function Wallet() {
    const { status, connect, account, chainId, ethereum } = useMetaMask();
    const style = {
        display: 'flex', alignItems: 'center', height: '100%'
    }
    if (status === "initializing") return (<div style={style}><Button basic circular >Synchronization with MetaMask ongoing...</Button></div>)

    if (status === "unavailable") return (<div style={style}><Button basic circular>MetaMask not available :(</Button></div>)

    if (status === "notConnected") return (<div style={style}><Button basic circular onClick={connect}>Connect to MetaMask</Button></div>)

    if (status === "connecting") return (<div style={style}><Button basic circular>Connecting...</Button></div>)

    if (status === "connected") {
        let data = new Identicon(account).toString();
        return (
            <>
                <div style={style}>
                    <Button circular basic>{account.substring(0, 5)}…{account.substring(account.length - 4)}</Button>
                    <Image src={`data:image/png;base64,${data}`} size='mini' circular />
                </div>
            </>)
    }

    return null;
}