export default function TextInput(props) {
    return (
      <>
          <input type="text" value={props.value} onChange={props.onChange} />
      </>  
    );
}