import { CheckboxCard } from "@/components/ui/checkbox-card";

const Habit = (props) => {
    return (
        // eslint-disable-next-line react/prop-types
        <CheckboxCard label={props.name} variant="outline" id="checkbox"/>
    );
};


export default Habit;