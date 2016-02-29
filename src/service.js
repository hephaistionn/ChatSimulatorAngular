module.exports = app => {

    app.service('chatService', function() {

        this.model = {
            thread: []
        };

        this.addMessage = (id, messages) => {
            this.model.thread.push({
                id: id,
                content: messages
            });
        };

        this.getThread = () => {
            return this.model.thread;
        };

    });

};
