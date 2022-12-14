describe('Home', function () {

  beforeEach(function () {
    browser.get('/');
  });

  it('should have <my-signin>', function () {
    var signin = element(by.css('my-app my-signin'));
    expect(signin.isPresent()).toEqual(true);
    expect(signin.getText()).toEqual("Signin Works!");
  });

});
