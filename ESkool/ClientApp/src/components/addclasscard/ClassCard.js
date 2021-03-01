import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import axios from "axios";
import {useHistory} from "react-router-dom";

const useStyles = makeStyles({
    root: {
        minWidth: 275,
        marginRight: 20,
        marginBottom: 20
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});

export default function ClassCard({classtitle, classcode}) {
    const classes = useStyles();
    const bull = <span className={classes.bullet}>•</span>;
    const history = useHistory();
    return (
        <Card className={classes.root}>
            <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    Class Code: {classcode}
                </Typography>
                <Typography variant="h5" component="h2">
                    {classtitle}
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                    Computer Science and Engineering
                </Typography>
                <Typography variant="body2" component="p">
                    Database Systems
                    
                </Typography>
            </CardContent>
            
                <Button size="small" onClick={() => {
                    history.push(`/classes/${classcode}`)
                }}>Enter</Button>
            
        </Card>
    );
}