import React, { useState, useContext, useEffect } from "react";
import { MyCard } from "./MyCard";
import { Context } from "../store/appContext";
import PropTypes from "prop-types";

export const MyCarousel = (props) => {
	const { store } = useContext(Context);
	const [valid, setValid] = useState(false);

	useEffect(() => {
		const interval = setInterval(() => {
			setValid(
				store.planets.length > 8 && store.people.length > 8 && store.vehicles.length > 8
			);
		}, 2000);
		return () => clearInterval(interval);
	}, [store.planets, store.people, store.vehicles]);

	let name;

	if (props.type === "people") {
		name = "Personajes";
	} else if (props.type === "planets") {
		name = "Planetas";
	} else if (props.type === "vehicles") {
		name = "Vehículos";
	}

	return (
		<div className="align-items-center text-center mb-5">
			<h2 className="col-12 text-left text-light text-capitalize" style={{ fontSize: "3rem", fontFamily: "fantasy" }}>
				{name}
			</h2>
			<div className="d-flex flex-row" style={{ width: "100%", overflow: "auto" }}>
				{valid ? (
					props.type === "people" ? (
						store.people.map((item, index) => (
							<MyCard
								name={item.name}
								type={props.type}
								gender={item.gender}
								height={item.height}
								hair_color={item.hair_color}
								index={index}
								key={index}
								url={item.url}
							/>
						))
					) : props.type === "planets" ? (
						store.planets.map((item, index) => (
							<MyCard
								name={item.name}
								type={props.type}
								population={item.population}
								terrain={item.terrain}
								climate={item.climate}
								index={index}
								key={index}
								url={item.url}
							/>
						))
					) : props.type === "vehicles" ? (
						store.vehicles.map((item, index) => (
							<MyCard
								name={item.name}
								type={props.type}
								model={item.model}
								passenger={item.passengers}
								manufacturer={item.manufacturer}
								index={index}
								key={index}
								url={item.url}
							/>
						))
					) : (
						console.log("Invalid type (At MyCarousel.js).")
					)
				) : (
					console.log("Fetch is Loading.")
				)}
			</div>
		</div>
	);
};

MyCarousel.propTypes = {
	title: PropTypes.string,
	type: PropTypes.string,
};
