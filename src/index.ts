import * as CryptoJS from 'crypto-js';
import { updateFor } from 'typescript';

class Block {
    public id: number;
    public hash: string;
    public previousHash: string;
    public data: string;
    public timestamp: number;

    //for count Block hash. Assign function in Block class for to show that this can be!)
    static calculateBlockHash = (
        id: number,
        previousHash: string,
        data: string,
        timestamp: number): string => CryptoJS.SHA256(id + previousHash + data + timestamp).toString();

    static validateStructure = (aBlock: Block): boolean => 
    typeof aBlock.id === 'number' 
    && typeof aBlock.hash === 'string' 
    && typeof aBlock.previousHash === 'string' 
    && typeof aBlock.data === 'string' 
    && typeof aBlock.timestamp === 'number';

    constructor(
        id: number,
        hash: string,
        previousHash: string,
        data: string,
        timestamp: number
    ) {
        this.id = id;
        this.hash = hash;
        this.previousHash = previousHash;
        this.data = data;
        this.timestamp = timestamp;
    };
}

const genesisBlock: Block = new Block(0, '131ijijp12398', '', 'Hi!', 1223452);

let blockchain: [Block] = [genesisBlock];

const getBlockchain = (): Block[] => blockchain; //To get blockchain
const getLastBlock = (): Block => blockchain[blockchain.length - 1]; // To get last block in block blockchain
const getTimestamp = (): number => Math.round(new Date().getTime() / 1000);

//To generic a new block
const createNewBlock = (data: string): Block => {
    const lastBlock: Block = getLastBlock();
    const newId: number = lastBlock.id + 1;
    const newTimestamp: number = getTimestamp();
    const newHash: string = Block.calculateBlockHash(
        newId,
        lastBlock.hash,
        data,
        newTimestamp);
    const newBlock: Block = new Block(
        newId,
        newHash,
        lastBlock.hash,
        data,
        newTimestamp);
    addBlock(newBlock);
    return newBlock;
};
const getHashForBlock = (aBlock: Block): string => Block.calculateBlockHash(
    aBlock.id, 
    aBlock.previousHash, 
    aBlock.data, 
    aBlock.timestamp);

//checking the block that we want to write to our blockchain meets our criteria 
const isBlockValid = (candidateBlock: Block, lastBlock: Block): boolean => {
    //If the Block have valid structure
    if(!Block.validateStructure(candidateBlock)) return false;
    //If ID new Block equal the old Block
    else if(lastBlock.id + 1 !== candidateBlock.id) return false;
    else if(lastBlock.hash !== candidateBlock.previousHash) return false;
    //If hash is equal with previousHash

    else if(getHashForBlock(candidateBlock) !== candidateBlock.hash) return false;
    return true;
}

const addBlock = (candidateBlock: Block): void => {
    if(isBlockValid(candidateBlock, getLastBlock())) blockchain.push(candidateBlock);
}

createNewBlock('Второй блок')
createNewBlock('Третий блок')
createNewBlock('Четвериый блок')
createNewBlock('Пятый блок')

console.log(blockchain);