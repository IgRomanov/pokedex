import { CardWrapper, Avatar, List, ListElement } from "../Card/styled";
import { useId } from "react";

const DropCard = ({ name, img, types, attack }) => {
    const typeId = useId();

    return (
        <CardWrapper $cursor="move">
            <h2>{name}</h2>
            {
                <Avatar src={img} alt={name} />
            }
            <div>
                <List>
                    {
                        types.map((type, index) => (
                            <ListElement key={`${typeId}-${index}`}>{type.type.name}</ListElement>
                        ))
                    }
                </List>
                <span>Attack: {attack}</span>
            </div>
        </CardWrapper>
    );
}

export default DropCard;