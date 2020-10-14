import React from 'react';
import './App.css';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Slider from "@material-ui/core/Slider";
import Api from './Api'
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import {withStyles} from "@material-ui/styles";

const MenuStep = {
    Lights: 'lights',
    Stats: 'stats',
    About: 'about',
}

const RGBMode = {
    Solid: 0,
    Rainbow: 1,
    PoliceAnimation: 2,
}


function App() {
    return <Main/>
}

class Main extends React.Component {

    constructor(props) {
        super(props);
        this.state = {RGB: {R: 0, G: 0, B: 0}}
    }


    handleLights = () => {
        this.setState({menuState: MenuStep.Lights})
    }
    handleStats = () => {
        this.setState({menuState: MenuStep.Stats})
    }
    handleAbout = () => {
        this.setState({menuState: MenuStep.About})
    }

    handleRGBUpdate = (r, g, b) => {
        this.setState({RGB: {R: r, G: g, B: b}})
        Api.updateRGB({R: r, B: b, G: g})
    }

    handleModeUpdate = (mode) => {
        this.setState({mode: mode})
        Api.updateMode(mode)
    }

    render() {
        let page;
        switch (this.state.menuState) {
            case "lights":
                page = <RGBSlider onUpdate={(r, g, b) => this.handleRGBUpdate(r, g, b)}
                                  onUpdateMode={(mode) => this.handleModeUpdate(mode)}
                />
                break;
            case "stats":
                page = <Button>Stats</Button>
                break;
            case "about":
                page = <Button>About</Button>
                break;
            default:
                page = <Paper/>
        }
        return (
            <Container maxWidth="xs">
                <Paper style={{
                    display: 'flex',
                    justifyContent: 'center'
                }}>
                    <Clock/>
                </Paper>

                <Paper style={{
                    position: 'relative',
                    top: 50,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <MainButtons onLights={this.handleLights} onStats={this.handleStats}
                                 onAbout={this.handleAbout}/>
                </Paper>

                <Paper style={{
                    position: 'relative',
                    top: 100,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    {page}
                </Paper>

            </Container>
        );
    }
}

class Clock extends React.Component {

    constructor(props) {
        super(props);
        this.state = {date: new Date()};
    }

    componentDidMount() {
        this.timerID = setInterval(() => this.tick(), 1000);
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    tick() {
        this.setState({
            date: new Date()
        });
    }

    render() {
        return (
            <div>
                <h1>{this.state.date.toLocaleTimeString()}</h1>
            </div>
        );
    }
}


function MainButtons(props) {
    return <ButtonGroup fullWidth size="medium" color="primary">
        <Button onClick={props.onLights}>Lights</Button>
        <Button onClick={props.onStats}>Stats</Button>
        <Button onClick={props.onAbout}>About</Button>
    </ButtonGroup>
}

const PrettoSlider = withStyles({
    root: {
        color: '#52af77',
        height: 8,
    },
    thumb: {
        height: 24,
        width: 24,
        backgroundColor: '#fff',
        border: '2px solid currentColor',
        marginTop: -8,
        marginLeft: -12,
        '&:focus, &:hover, &$active': {
            boxShadow: 'inherit',
        },
    },
    active: {},
    valueLabel: {
        left: 'calc(-50% + 4px)',
    },
    track: {
        height: 8,
        borderRadius: 4,
    },
    rail: {
        height: 8,
        borderRadius: 4,
    },
})(Slider);


class RGBSlider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {mode: RGBMode.Solid}
        this.onUpdate = props.onUpdate
        this.onUpdateMode = props.onUpdateMode
    }




    render() {
        return <div id="content">
            <PrettoSlider onChangeCommitted={(event, value) => {
                this.setState({R: value})
            }}
                    style={{
                        position: 'relative',
                        color: '#FF0000',
                        width: 200
                    }} defaultValue={0}
                    aria-labelledby="discrete-slider"
                    valueLabelDisplay="auto"
                    min={0}
                    max={225}/>
            <PrettoSlider onChangeCommitted={(event, value) => {
                this.setState({G: value})
            }}
                    style={{
                        position: 'relative',
                        color: '#00FF00',
                        width: 200
                    }} defaultValue={0}
                    aria-labelledby="discrete-slider"
                    valueLabelDisplay="auto"
                    min={0}
                    max={225}/>
            <PrettoSlider onChangeCommitted={(event, value) => {
                this.setState({B: value})
            }}
                    style={{
                        position: 'relative',
                        color: '#0000FF',
                        width: 200
                    }} defaultValue={0}
                    aria-labelledby="discrete-slider"
                    valueLabelDisplay="auto"
                    min={0}
                    max={225}/>
            <Button onClick={() => this.onUpdate(this.state.R, this.state.G, this.state.B)}>Update</Button>

            <FormControl>
                <InputLabel id="demo-simple-select-label">Age</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={this.state.mode}
                    onChange={(event) => this.setState({mode: event.target.value})}
                >
                    <MenuItem value={RGBMode.Solid}>Solid</MenuItem>
                    <MenuItem value={RGBMode.Rainbow}>Rainbow</MenuItem>
                    <MenuItem value={RGBMode.PoliceAnimation}>PoliceAnimation</MenuItem>
                </Select>
            </FormControl>

            <Button onClick={() => this.onUpdateMode(this.state.mode)}>Update Mode</Button>
        </div>
    }
}

export default App;
