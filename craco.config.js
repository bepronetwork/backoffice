const CracoLessPlugin = require('craco-less');
const { getThemeVariables } = require('antd/dist/theme');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              ...getThemeVariables({
                dark: false
              }),
              '@primary-color': '#984EFB',
              '@border-radius-base': '6px',
              '@font-size-base': '13px'
            },
            javascriptEnabled: true
          }
        }
      }
    }
  ]
};
