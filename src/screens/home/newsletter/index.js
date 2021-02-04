import React from 'react';
import {Avatar, Button, Card, Paragraph, Title} from "react-native-paper";

const LeftContent = props => <Avatar.Icon {...props} icon="folder" />

const NewsLetterCard = ({item, index}) => {
    return (
        <Card>
            <Card.Title title={item.text} subtitle={'Publicado em 22/01/2021 17:20'} />
            {/*<Card.Content>*/}
                {/*<Title>Card title</Title>*/}
                {/*<Paragraph>Card content</Paragraph>*/}
            {/*</Card.Content>*/}
            <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
            {/*<Card.Actions>*/}
            {/*    <Button>Cancel</Button>*/}
            {/*    <Button>Ok</Button>*/}
            {/*</Card.Actions>*/}
        </Card>
    );
}

export default NewsLetterCard;
