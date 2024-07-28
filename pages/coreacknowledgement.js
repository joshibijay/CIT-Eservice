exports.acknowledgement = class acknowledgement {
    constructor(page) {
        this.page = page;
        this.login_url = page.goto('http://172.31.1.13:1901/', { timeout: 10000 });
        this.username = page.locator('#Username');
        this.password = page.locator('#Password');
        this.login_button = page.getByRole('button', { name: 'Login' });
        this.core_click = page.getByRole('link', { name: 'Core  ' });
        this.approval_dashboard = page.getByText('Approval Dashboard');
        this.fill_search = page.locator('#IndexCommon div').filter({ hasText: 'Description Action Description Action 1Collection Head Setup (1) 2Customer' }).getByRole('textbox');
        this.approve_click = page.getByRole('link', { name: '' }).nth(1);
    }
    async core_acknowledgment(username, password, fill_search) {
        await this.username.fill(username);
        await this.password.fill(password);
        await this.login_button.click();
        await this.core_click.click();
        await this.approval_dashboard.click();
        await this.fill_search.pressSequentially(fill_search);
        await this.approve_click.click();
    }
}


