module.exports = app => {

    app.service('chatService', function() {

        this.model = {
            thread: []
        };

        this.addMessage = (id, messages, label) => {
            if(messages === '') return;
            this.model.thread.push({
                id: id,
                label: label,
                content: messages
            });
        };

        this.getThread = () => {
            return this.model.thread;
        };

    });

};
