const TasksContract = artifacts.require("TasksContract");

contract("TasksContract", ()=>{


    before(async ()=>{
        this.contract = await TasksContract.deployed();
    });

    it('migrate deployed succesfully', async ()=>{
        const address = this.contract.address;

        assert.notEqual(address, null);
        assert.notEqual(address, undefined);
        assert.notEqual(address, '');

    });

    it('get Task list', async ()=>{
        const counter = (await this.contract.taskCounter()) - 1;
        const task = await this.contract.tasks(counter);
        assert.equal(task.id.toNumber(), counter);
        assert.notEqual(task, null);
        assert.notEqual(task, undefined);
    });

    it("task created sucefully", async ()=>{
        const data = {
            title: 'task test',
            description: 'task description'
        };
        const result = await this.contract.createTask(data.title, data.description);
        const event = result.logs[0].args;
        assert.equal(event.id.toNumber(), 1);
        assert.equal(event.title, data.title);
        assert.equal(event.description, data.description);
    });

    it("task toggled true", async ()=>{
        const data = {
            title: 'task test',
            description: 'task description'
        };
        const resultTask = await this.contract.createTask(data.title, data.description);
        const eventTask = resultTask.logs[0].args;
        const result = await this.contract.toggleDone(eventTask.id.toNumber());
        const event = result.logs[0].args;
        assert.equal(event.done, true); 
    });

    it("task toggled false", async ()=>{
        const data = {
            title: 'task test',
            description: 'task description'
        };
        const resultTask = await this.contract.createTask(data.title, data.description);
        const eventTask = resultTask.logs[0].args;
        await this.contract.toggleDone(eventTask.id.toNumber());
        const result = await this.contract.toggleDone(eventTask.id.toNumber());
        const event = result.logs[0].args;
        assert.equal(event.done, false); 
    });

});