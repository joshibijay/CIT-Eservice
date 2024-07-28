exports.login=class login {

    constructor(page) {
        this.page = page;
        this.username = page.locator('#Username');
        this.password = page.locator('#Password');
        this.login_button = page.getByRole('button', { name: 'Login' });
    }

    async eservicelogin(user_name, pass_word) {
        await this.username.fill(user_name);
        await this.password.fill(pass_word);
        await this.login_button.click();

    }
}
