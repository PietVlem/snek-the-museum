import React from 'react';
import { Provider } from 'react-redux';
import store from './app/store';
import Main from './app/index';
import { Font, AppLoading } from 'expo';

function cacheFonts(fonts) {
    return fonts.map(font => Font.loadAsync(font));
}

export default class App extends React.Component {
    constructor() {
        super();
        this.state = {
            isReady: false,
        }
    }

    async _loadAssetsAsync() {
        const fontAssets = cacheFonts([
            {RobotoBold: require('./assets/fonts/Roboto-Bold.ttf')},
            {RobotoRegular: require('./assets/fonts/Roboto-Regular.ttf')},
            {RobotoLight: require('./assets/fonts/Roboto-Light.ttf')}
        ]);
        await Promise.all([...fontAssets]);
    }

    render() {
        console.disableYellowBox = true; 
        if (!this.state.isReady) {
            return (
                <AppLoading
                    startAsync={this._loadAssetsAsync}
                    onFinish={() => this.setState({isReady: true})}
                    onError={console.warn}
                />
            );
        }

        return (
            <Provider store={store}>
              <Main />
            </Provider>
        );
    }
}