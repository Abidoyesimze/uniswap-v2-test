import {ethers} from "hardhat";
import {impersonateAccount} from "@nomicfoundation/hardhat-toolbox/network-helpers"

async function main(){
    const TOKEN_Holder = "0xf584F8728B874a6a5c7A8d4d387C9aae9172D621";
    const ETH_ADDRESS = "0x40B38765696e3d5d8d9d834D8AaD4bB6e418E489";
    const TOKEN_AMOUNT  = await ethers.parseUnits("100", 18);
    const ethAmount = await ethers.parseEther("0.5");
    const ROUTER_ADDRESS = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D";
    await impersonateAccount(TOKEN_Holder);
    const impersonatedSigner = await ethers.getSigner(TOKEN_Holder);
    const ROUTER = await ethers.getContractAt("IUniswapV2", ROUTER_ADDRESS, impersonatedSigner);
    const ETH_CONTRACT = await ethers.getContractAt("IERC20", ETH_ADDRESS, impersonatedSigner);

    const amountTokenDesired = ethers.parseUnits("100", 18);
    const amountTokenMin = ethers.parseUnits("9.0", 18); 
    const amountETHMin = ethers.parseEther("0.9"); 
    const deadline = Math.floor(Date.now() / 1000) + (60 * 10);
    await ETH_CONTRACT.approve(ROUTER, amountTokenDesired);

    const ethBal = await ETH_CONTRACT.balanceOf(impersonatedSigner.address);

    console.log("balance before", ethers.formatUnits(ethBal, 18));
    await ROUTER.addLiquidityETH(
        ETH_ADDRESS,
        amountTokenDesired,
        amountTokenMin,
        amountETHMin,
        impersonatedSigner,
        deadline
    );
    const ethBAL = await ETH_CONTRACT.balanceOf(impersonatedSigner.address);
    await ETH_CONTRACT.approve(ROUTER, amountTokenDesired);
    console.log("balance after", ethers.formatUnits(ethBal, 18));
    console.log("=============================================");

    await ROUTER.removeLiquidityETH(
        ETH_ADDRESS,
        amountTokenDesired,
        amountTokenMin,
        amountETHMin,
        impersonatedSigner,
        deadline
    
       );
       const usdcBal1 = await ETH_CONTRACT.balanceOf(impersonatedSigner.address);
       console.log("==========================================");
       console.log("balance after removing", ethers.formatUnits(ethBAL, 18));



}
main().catch((e)=>{
    console.log(e);
    
})
