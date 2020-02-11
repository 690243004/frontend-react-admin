import { bindActionCreators } from "redux";
import Actions from "@a/actions";
export const mapStateToProps = namespace=> { 
  return state => {
    return { modelObj: state[namespace] };
  }  
}

export const mapDispatchToProps = dispatch => {
  return {
    action: bindActionCreators(Actions, dispatch),
    dispatch
  };
};
