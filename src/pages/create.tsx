import Head from "next/head";
import styles from "@/styles/Home.module.css";
import { ContainedTextInput } from "@/components/Inputs";
import { Button, Rating, Title } from "@mantine/core";
import { useEffect, useState } from "react";
import { Amenities } from "@/components/Amenities";
import { useRouter } from "next/router";

interface Amenity {
  name: string;
  checked: boolean;
}

export default function Create() {
  const [amenities, setAmenities] = useState<Amenity[]>([]);
  const [name, setName] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [rating, setRating] = useState<number>(0);

  //   console.log(amenities);
  const router = useRouter();

  const getAmenities = () => {
    fetch("http://localhost:8080/amenities", {
      mode: "cors",
    })
      .then((response) => response.json())
      .then((data) => {
        setAmenities(
          data._embedded.amenities.map((item: any) => ({
            name: item.name,
            checked: false,
          }))
        );
      });
  };

  useEffect(() => {
    getAmenities();
  }, []);

  const createHotel = (e: any) => {
    e.preventDefault();
    const hotel = {
      name,
      address,
      rating,
      amenities: amenities
        .map((item) => {
          if (!item.checked) return null;
          return item.name;
        })
        .filter((item) => !!item),
    };
    console.log(hotel);
    fetch("http://localhost:8080/hotels", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(hotel),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        router.push("/");
      });
  };

  return (
    <>
      <Head>
        <title>Bootcamp Hotels</title>

        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Title order={1} m="3rem">
          New Hotel
        </Title>
        <form onSubmit={createHotel}>
          <ContainedTextInput
            label="Name"
            placeholder="what's the hotel's name?"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <ContainedTextInput
            label="Address"
            placeholder="what's the hotel's address?"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <div>Rating: </div>
          <Rating
            fractions={2}
            defaultValue={0}
            size="xl"
            mb="1rem"
            value={rating}
            onChange={setRating}
          />

          <Amenities amenities={amenities} setAmenities={setAmenities} />

          <Button
            variant="gradient"
            gradient={{ from: "indigo", to: "cyan" }}
            m="3rem"
            w={"5rem"}
            type="submit"
          >
            Create
          </Button>
        </form>
      </main>
    </>
  );
}
