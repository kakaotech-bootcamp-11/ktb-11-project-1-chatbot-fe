import BookWidget from "./BookWidget";
import CalendarWidget from "./CalendarWidget";
import MeetingWidget2 from "./MeetingWidget2";
import MentoringWidget from "./MetoringWidget";
import RestaurantWidget from "./RestaurantWidget";
import WeatherWidget from "./WeatherWidget";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import { useState, useEffect } from "react";

const WIDGET_ORDER_KEY = "widgetOrder";

const initialWidgets = [
  { id: "1", component: <RestaurantWidget /> },
  { id: "2", component: <WeatherWidget /> },
  { id: "3", component: <CalendarWidget /> },
  { id: "4", component: <BookWidget /> },
  { id: "5", component: <MeetingWidget2 /> },
  { id: "6", component: <MentoringWidget /> },
];

function Skeleton() {
  return (
    <div className="bg-gray-300 p-4 rounded-xl shadow-md animate-pulse h-1/2"></div>
  );
}

export default function Widget() {
  const [widgets, setWidgets] = useState(initialWidgets);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedOrder = localStorage.getItem(WIDGET_ORDER_KEY);
    if (savedOrder) {
      const orderedIds = JSON.parse(savedOrder);
      const orderedWidgets = orderedIds.map((id: string) =>
        initialWidgets.find((widget) => widget.id === id)
      );
      setWidgets(orderedWidgets);
    } else {
      setWidgets(initialWidgets);
    }
    setIsLoading(false);
  }, []);

  // Update widget order in localStorage on drag end
  const onDragEnd = (result: any) => {
    const { destination, source } = result;
    if (!destination) return;
    if (destination.index === source.index) return;

    const reorderedWidgets = Array.from(widgets);
    const [movedWidget] = reorderedWidgets.splice(source.index, 1);
    reorderedWidgets.splice(destination.index, 0, movedWidget);

    setWidgets(reorderedWidgets);

    // Save the new order to localStorage
    const newOrder = reorderedWidgets.map((widget) => widget.id);
    localStorage.setItem(WIDGET_ORDER_KEY, JSON.stringify(newOrder));
  };

  if (isLoading) {
    return (
      <div className="w-full h-full space-y-2">
        <Skeleton />
        <Skeleton />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 w-full h-full overflow-y-auto px-1 rounded-xl custom-scrollbar">
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="widgets">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="space-y-2"
            >
              {widgets.map((widget, index) => (
                <Draggable
                  key={widget.id}
                  draggableId={widget.id}
                  index={index}
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="rounded-xl shadow-md"
                    >
                      {widget.component}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}
