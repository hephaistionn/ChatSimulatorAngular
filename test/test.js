describe('Protractor Demo App', function() {

    browser.get('http://localhost:3000/');

    var chatBoxes = element.all(by.css('.chatBox'));
    var chatBoxeA = chatBoxes.first();
    var chatBoxeB = chatBoxes.last();
    var threadA = chatBoxeA.element(by.css('.thread')).all(by.tagName('li'));
    var threadB = chatBoxeB.element(by.css('.thread')).all(by.tagName('li'));
    var inputA = chatBoxeA.element(by.model('currentMessage'));
    var inputB = chatBoxeB.element(by.model('currentMessage'));
    var buttonA = chatBoxeA.element(by.css('.button'));
    var buttonB = chatBoxeB.element(by.css('.button'));
    var LabelA;
    var LabelB;

    chatBoxeA.getAttribute('label').then(function(value){
        LabelA = value;
    });
    chatBoxeB.getAttribute('label').then(function(value){
        LabelB = value;
    });

    it('should not have messages', function() {
        expect(threadA.getText()).toEqual([]);
        expect(threadB.getText()).toEqual([]);
        expect(inputA.getAttribute('value')).toEqual('');
        expect(inputB.getAttribute('value')).toEqual('');
    });

    it('should store message in input', function() {
        inputA.sendKeys('hello');
        expect(inputA.getAttribute('value')).toEqual('hello');
    });

    it('should send message A', function() {
        buttonA.click();
        expect(inputA.getAttribute('value')).toEqual('');
        threadA.first().getText().then(function(value){console.log(value)});
        expect(threadA.first().getText()).toEqual(LabelA + ':hello');
        expect(threadB.first().getText()).toEqual(LabelA + ':hello');
        expect(threadA.count()).toEqual(1);
        expect(threadB.count()).toEqual(1);
    });

    it('should send message B', function() {
        inputB.sendKeys('hello too');
        buttonB.click();
        expect(inputB.getAttribute('value')).toEqual('');
        expect(threadA.first().getText()).toEqual(LabelA + ':hello');
        expect(threadB.first().getText()).toEqual(LabelA + ':hello');
        expect(threadA.last().getText()).toEqual(LabelB + ':hello too');
        expect(threadB.last().getText()).toEqual(LabelB + ':hello too');
        expect(threadA.count()).toEqual(2);
        expect(threadB.count()).toEqual(2);
    });

    it('shouldn\'t send empty message', function() {
        inputB.sendKeys('');
        buttonB.click();
        expect(inputB.getAttribute('value')).toEqual('');
        expect(threadA.last().getText()).toEqual(LabelB + ':hello too');
        expect(threadB.last().getText()).toEqual(LabelB + ':hello too');
        expect(threadA.count()).toEqual(2);
        expect(threadB.count()).toEqual(2);
    });

//chatBoxeA.getInnerHtml().then(function(value){console.log(value)});
//screen.isDisplayed().then(function(value){console.log(value)});
});
