import { Checkbox } from "@mantine/core";
import { useState } from "react";

interface AmenitiesProps {
  amenities: Amenity[];
  setAmenities: (amenities: Amenity[]) => void;
}

interface Amenity {
  name: string;
  checked: boolean;
}

export function Amenities({ amenities, setAmenities }: AmenitiesProps) {
  const handleClick = (index: number, checked: boolean) => {
    const amenitiesArr = [...amenities];
    amenitiesArr[index].checked = !checked;
    setAmenities(amenitiesArr);
  };

  const values = () => {
    return amenities
      .map((item) => (item.checked ? item.name : ""))
      .filter((item) => !!item);
  };

  return (
    <Checkbox.Group
      //   defaultValue={['react']}
      label="Amenities"
      description="Pick the amenities included in the hotel"
      spacing="xl"
      offset="lg"
      size="md"
      value={values()}
    >
      {amenities &&
        amenities.map((item, index) => (
          <Checkbox
            value={item.name}
            label={item.name}
            key={item.name}
            checked={item.checked}
            onClick={() => handleClick(index, item.checked)}
          />
        ))}
    </Checkbox.Group>
  );
}
