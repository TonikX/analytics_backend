class bugModalLocalStorage {
  getPageTransitions() {
    return parseInt(localStorage.getItem('pageTransitions') || '0');
  }

  getDisableAutoShowModal() {
    return !!localStorage.getItem('disableAutoShowModal')
  }

  setDisableAutoShowModal(disable: boolean) {
    localStorage.setItem('disableAutoShowModal', disable + '')
  }

  resetPageTransitions() {
    localStorage.setItem('pageTransitions', '0')
  }

  updatePageTransition() {
    if(!this.getDisableAutoShowModal()) {
      localStorage.setItem('pageTransitions', (this.getPageTransitions() + 1).toString());
    }
  }
}

export default bugModalLocalStorage;
