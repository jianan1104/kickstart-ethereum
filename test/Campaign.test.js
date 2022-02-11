const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());

const compiledFactory = require('../ethereum/build/CampaignFactory.json');
const compiledCampaign = require('../ethereum/build/Campaign.json');

let accounts, factory, campaignAddress, campaign;

beforeEach(async () => {
    accounts = await web3.eth.getAccounts();
    factory = await new web3.eth.Contract(JSON.parse(JSON.stringify(compiledFactory.abi)))
        .deploy({
            data: compiledFactory.evm.bytecode.object
        })
        .send({
            from: accounts[0],
            gas: '1500000'
        });
    
    await factory.methods.createCampaign('100').send({
        from: accounts[0],
        gas: '1000000'
    });

    [campaignAddress] = await factory.methods.getDeployedCampaign().call(); 
    campaign = await new web3.eth.Contract(
        JSON.parse(JSON.stringify(compiledCampaign.abi)), 
        campaignAddress
        );

});


describe('Campaign', () => {
    it('deploy a factory and a campaign', () => {
        assert.ok(factory.options.address);
        assert.ok(campaign.options.address);
    });

    it('marks caller as the campaign manager', async () => {
        const manager = await campaign.methods.manager().call();
        assert.equal(manager, accounts[0]);
    });

    it('allows people to contribute money and marks as approvers', async () => {
        await Promise.all(accounts.map(async (account) => {
            await campaign.methods.contribute().send({
                value: '200',
                from: account
            });
            const isContributor = await campaign.methods.approvers(account).call();
            assert(isContributor);
          }));
    });

    it('require a minimum contribution', async () => {
        try {
            await campaign.methods.contribute().send({
                value: '5',
                from: accounts[1]
            });
            assert(false);
        } catch (error) {
            assert(error);
        }
    });

    it('allow a manager to make a payment request', async () => {
        await campaign.methods
            .createRequest('Buy battery', '100', accounts[1])
            .send({
                from: accounts[0],
                gas: '1000000'
            });
        const request = await campaign.methods.requests(0).call();
        assert.equal(request.description, 'Buy battery');
    });

    it('preocess request', async () => {
        await campaign.methods.contribute().send({
            from: accounts[0],
            value: web3.utils.toWei('1', 'ether')
        });

        await campaign.methods
            .createRequest('Buy battery', web3.utils.toWei('0.5', 'ether'), accounts[1])
            .send({
                from: accounts[0],
                gas: '1000000'
            });
        
        await campaign.methods.approveRequest(0).send({
            from: accounts[0],
            gas: '1000000'
        });

        const _balance = await web3.eth.getBalance(accounts[1]);
        await campaign.methods.finalizeRequest(0).send({
            from: accounts[0],
            gas: '1000000'
        });

        const balance = await web3.eth.getBalance(accounts[1]);
        let finalBalance = balance - _balance;

        finalBalance = web3.utils.fromWei(finalBalance.toString(), 'ether');
        finalBalance = parseFloat(finalBalance);

        assert(finalBalance > 0.4);
    })
});