export default () => ({
  root: {
    display: 'flex',
    marginTop: '64px',
    background: '#ebebeb'
  },
  content: {
    flexGrow: 1,
    transition: '0.2s all',
    marginLeft: 0,
    boxSizing: 'border-box',
    minHeight: `calc(100vh - 64px)`,
  },
  contentShift: {
    transition: '0.2s all',
    marginLeft: 250,
  },
  noPadding: {
    padding: 0
  }
});
