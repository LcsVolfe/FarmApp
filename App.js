import React from 'react';
import AppNavigator from './src/AppNavigation';
import UserToken from './src/service/sqlite/user_token';


const App: () => React$Node = () => {
    // UserToken.create({token: 'armazenou', username: 'nome do usuario'})
    //     .then(token => console.log(token))
    //     .catch(err => console.log(err))



    // UserToken.update(1,{token: 'armazenou', username: 'editou'})
    //     .then(token => console.log(token))
    //     .catch(err => console.log(err))
    // UserToken.all().then(tokens => console.log(tokens))

    return <AppNavigator />;
};

export default App;
