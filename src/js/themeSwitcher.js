export class ThemeSwitcher {
    constructor(deskSwitchEl, mobSwitchEl) {
      this.themeSwitcherEl = deskSwitchEl;
      this.mobileSwitcherEl = mobSwitchEl;
      this.THEME_STORAGE_KEY = 'theme';
      this.Theme = {
        LIGHT: 'light',
        DARK: 'dark',
      };
    }
  
    onThemeToggle = () => {
      const isLightTheme = this.getBoolean();
  
      if (isLightTheme) {
        localStorage.setItem(this.THEME_STORAGE_KEY, this.Theme.DARK);
      }
  
      if (!isLightTheme) {
        localStorage.setItem(this.THEME_STORAGE_KEY, this.Theme.LIGHT);
      }
  
      this.renderTheme();
      return;
    };
  
    renderTheme() {
      const isLightTheme = this.getBoolean();
  
      if (!isLightTheme) {
        this.themeSwitcherEl.setAttribute('checked', true);
        this.mobileSwitcherEl.setAttribute('checked', true);
        this.changeBodyClass(this.Theme.DARK, this.Theme.LIGHT);
      }
  
      if (isLightTheme) {
        this.changeBodyClass(this.Theme.LIGHT, this.Theme.DARK);
      }
    }
  
    changeBodyClass(add, remove) {
      document.body.classList.add(add);
      document.body.classList.remove(remove);
    }
  
    getBoolean() {
      const storageTheme = localStorage.getItem(this.THEME_STORAGE_KEY);
      return storageTheme === this.Theme.LIGHT || !storageTheme;
    }
  }
  