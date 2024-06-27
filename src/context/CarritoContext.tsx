import { createContext, useState, ReactNode, useEffect } from "react";
import DetallePedido from "../entidades/DetallePedido";
import ArticuloInsumo from "../entidades/ArticuloInsumo";
import ArticuloManufacturado from "../entidades/ArticuloManufacturado";
import Promocion from "../entidades/Promocion";
import { localData } from "../servicios/FuncionesAPI";

interface CarritoTypes {
  carrito: DetallePedido[];
  addArticuloCarrito: (item: ArticuloInsumo | ArticuloManufacturado) => void;
  removeArticuloCarrito: (item: ArticuloInsumo | ArticuloManufacturado) => void;
  addPromoCarrito: (item: Promocion) => void;
  removePromoCarrito: (item: Promocion) => void;
  vaciarCarrito: () => void;
  totalPedido: number;
  setTotalPedido: React.Dispatch<React.SetStateAction<number>>;
  totalEnvio: number;
  setTotalEnvio: React.Dispatch<React.SetStateAction<number>>;
}

export const CarritoContext = createContext<CarritoTypes>({
  carrito: [],
  addArticuloCarrito: () => { },
  removeArticuloCarrito: () => { },
  addPromoCarrito: () => { },
  removePromoCarrito: () => { },
  vaciarCarrito: () => { },
  totalPedido: 0,
  setTotalPedido: () => { },
  totalEnvio: 0,
  setTotalEnvio: () => { },
});

export const CarritoProvider = ({ children }: { children: ReactNode }) => {
  const [carrito, setCarrito] = useState<DetallePedido[]>(localData.getCarrito('carrito') || []);
  const [totalPedido, setTotalPedido] = useState<number>(0);
  const [totalEnvio, setTotalEnvio] = useState<number>(0);

  useEffect(() => {
    const calcularTotal = () => {
      let total: number = 0;
      carrito.forEach((item: DetallePedido) => {
        total += item.subTotal;
      });
      setTotalPedido(total);
      setTotalEnvio(20);
    };

    calcularTotal();
    localData.setCarrito('carrito', carrito); // Guardar el carrito en localStorage cada vez que cambia
  }, [carrito]);

  const addArticuloCarrito = (item: ArticuloInsumo | ArticuloManufacturado) => {
    const estaEnCarrito = carrito.find(
      (itemCarrito) => itemCarrito.articulo === item.id
    );

    if (estaEnCarrito) {
      setCarrito(
        carrito.map((itemCarrito) =>
          itemCarrito.articulo === item.id
            ? { ...itemCarrito, cantidad: itemCarrito.cantidad + 1, subTotal: (itemCarrito.cantidad + 1) * item.precioVenta }
            : itemCarrito
        )
      );
    } else {
      const newItem = new DetallePedido;
      newItem.id = 0;
      newItem.cantidad = 1;
      newItem.subTotal = item.precioVenta;
      newItem.articulo = item.id;
      newItem.promocion = null;
      newItem.articuloAux = item;
      setCarrito([...carrito, newItem]);
    }
  };

  const removeArticuloCarrito = (item: ArticuloInsumo | ArticuloManufacturado) => {
    const estaEnCarrito = carrito.find(
      (itemCarrito) => itemCarrito.articulo === item.id
    );

    if (estaEnCarrito) {
      if (estaEnCarrito.cantidad === 1) {
        setCarrito(carrito.filter((itemCarrito) => itemCarrito.articulo !== item.id));
      } else {
        setCarrito(
          carrito.map((itemCarrito) =>
            itemCarrito.articulo === item.id
              ? { ...itemCarrito, cantidad: itemCarrito.cantidad - 1, subTotal: (itemCarrito.cantidad - 1) * item.precioVenta }
              : itemCarrito
          )
        );
      }
    }
  };

  const addPromoCarrito = (item: Promocion) => {
    const estaEnCarrito = carrito.find(
      (itemCarrito) => itemCarrito.promocion === item.id
    );

    if (estaEnCarrito) {
      setCarrito(
        carrito.map((itemCarrito) =>
          itemCarrito.promocion === item.id
            ? { ...itemCarrito, cantidad: itemCarrito.cantidad + 1, subTotal: (itemCarrito.cantidad + 1) * item.precioPromocional }
            : itemCarrito
        )
      );
    } else {
      const newItem = new DetallePedido;
      newItem.id = 0;
      newItem.cantidad = 1;
      newItem.subTotal = item.precioPromocional;
      newItem.articulo = null;
      newItem.promocion = item.id;
      newItem.promocionAux = item;
      setCarrito([...carrito, newItem]);
    }
  };

  const removePromoCarrito = (item: Promocion) => {
    const estaEnCarrito = carrito.find(
      (itemCarrito) => itemCarrito.promocion === item.id
    );

    if (estaEnCarrito) {
      if (estaEnCarrito.cantidad === 1) {
        setCarrito(carrito.filter((itemCarrito) => itemCarrito.promocion !== item.id));
      } else {
        setCarrito(
          carrito.map((itemCarrito) =>
            itemCarrito.promocion === item.id
              ? { ...itemCarrito, cantidad: itemCarrito.cantidad - 1, subTotal: (itemCarrito.cantidad - 1) * item.precioPromocional }
              : itemCarrito
          )
        );
      }
    }
  };

  const vaciarCarrito = () => {
    setCarrito([]);
  };

  return (
    <CarritoContext.Provider
      value={{
        carrito,
        addArticuloCarrito,
        removeArticuloCarrito,
        addPromoCarrito,
        removePromoCarrito,
        vaciarCarrito,
        totalPedido,
        setTotalPedido,
        totalEnvio,
        setTotalEnvio
      }}
    >
      {children}
    </CarritoContext.Provider>
  );
};
