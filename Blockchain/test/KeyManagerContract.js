const KeyManagerContract = artifacts.require("KeyManagerContract");

contract("KeyManagerContract", () => {

    const addressTest = "0xA3fC5839C9F3C81D0159a23918f98486B5D28679";

    before(async () => {
        this.contract = await KeyManagerContract.deployed();
    });

    it('migrate deployed succesfully', async () => {
        const address = this.contract.address;

        assert.notEqual(address, null);
        assert.notEqual(address, undefined);
        assert.notEqual(address, '');

    });

    it("key created sucefully", async () => {
        const data = {
            title: "test title",
            user: "test user",
            password: "test password",
            note: "test note"
        };
        const result = await this.contract.createKey(addressTest, data);
        const event = result.logs[0].args;
        assert.isAtLeast(event.id.toNumber(), 1);
    });

    it('get Keys list', async () => {
        const keys = await this.contract.getKeys(addressTest);
        assert.notEqual(keys, null);
        assert.notEqual(keys, undefined);
    });

    it('update key', async () => {
        const data = {
            title: "test title erick",
            user: "test user",
            password: "test password",
            note: "test note"
        };
        await this.contract.updateKey(addressTest, 0, data);
        let keysAfter = await this.contract.getKeys(addressTest);
        assert.equal(data.title, keysAfter[0].title);
    });

    it('delete key', async () => {
        const data = {
            title: "test different title",
            user: "test user",
            password: "test password",
            note: "test note"
        };
        await this.contract.createKey(addressTest, data);
        await this.contract.createKey(addressTest, data);
        await this.contract.createKey(addressTest, data);
        await this.contract.createKey(addressTest, data);


        const keysBefore = await this.contract.getKeys(addressTest);
        await this.contract.deleteKey(addressTest, 0);
        const keysAfter = await this.contract.getKeys(addressTest);
        assert.equal(keysAfter.length, 4);
    });



    // it("task toggled true", async ()=>{
    //     const data = {
    //         title: 'task test',
    //         description: 'task description'
    //     };
    //     const resultTask = await this.contract.createTask(data.title, data.description);
    //     const eventTask = resultTask.logs[0].args;
    //     const result = await this.contract.toggleDone(eventTask.id.toNumber());
    //     const event = result.logs[0].args;
    //     assert.equal(event.done, true); 
    // });

    // it("task toggled false", async ()=>{
    //     const data = {
    //         title: 'task test',
    //         description: 'task description'
    //     };
    //     const resultTask = await this.contract.createTask(data.title, data.description);
    //     const eventTask = resultTask.logs[0].args;
    //     await this.contract.toggleDone(eventTask.id.toNumber());
    //     const result = await this.contract.toggleDone(eventTask.id.toNumber());
    //     const event = result.logs[0].args;
    //     assert.equal(event.done, false); 
    // });

});