import React, { Component } from "react";
import Calendario from "react-datepicker";
import Ventana from "../../../UI/Ventana/Ventana";
import classes from "./configTasker.css";
import CreateTask from "../Task/CreateTask/CreateTask";
import Arrow from "../../../Assets/Imagenes/Arrow.png";
import Plus from "../../../Assets/Imagenes/plus.png";
import CalendarioBtn from "../../../UI/Buttoms/Calendar/Calendar";

class ConfigTasker extends Component {
  state = {
    date: new Date(),
    showCreate: false,
    formatDate: "",
  };

  shouldComponentUpdate(nextProps, nextState) {
    if (
      this.state.date === nextState.date &&
      this.state.showCreate === nextState.showCreate
    )
      return false;
    else return true;
  }

  onChange = (date) => {
    this.setState({ date });
    this.props.updateDate(date.toDateString());
  };
  openCalendar = () => this.setState({ show: true });

  ocultarCreate = (e) => {
    if (e) this.props.reUpdate();
    this.setState({ showCreate: false });
  };
  openCreate = () => {
    this.setState({ showCreate: true });
  };
  btnNextPrev = (flag) => {
    let fecha = new Date(this.state.date);
    flag
      ? fecha.setDate(fecha.getDate() + 1)
      : fecha.setDate(fecha.getDate() - 1);

    this.onChange(fecha);
  };

  render() {
    return (
      <React.Fragment>
        <Ventana
          mostrar={this.state.showCreate}
          cerrarVentana={this.ocultarCreate}
        >
          <CreateTask
            cerrarVentana={() => this.ocultarCreate(true)}
            update={false}
            date={this.state.date.toDateString()}
            dateReal={this.state.date}
          />
        </Ventana>
        <div className={classes.Configuracion}>
          <div
            className={classes.newDate}
            onClick={() => this.btnNextPrev(false)}
          >
            <img src={Arrow} alt="logo" className={classes.left} />
          </div>
          <div className={classes.CalendarioDiv}>
            <Calendario
              selected={this.state.date}
              minDate={new Date()}
              onChange={this.onChange}
              value={this.state.date}
              customInput={<CalendarioBtn />}
            />
          </div>

          <div
            className={classes.newDate}
            onClick={() => this.btnNextPrev(true)}
          >
            <img src={Arrow} alt="logo" className={classes.right} />
          </div>
        </div>

        <div className={classes.Controles}>
          <img src={Plus} alt="Agregar" onClick={this.openCreate} />
        </div>
      </React.Fragment>
    );
  }
}

export default ConfigTasker;
