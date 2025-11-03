import { createContext, useContext, useReducer, useEffect } from 'react';

const DashboardContext = createContext();

// Action types
const ACTIONS = {
  ADD_WIDGET: 'ADD_WIDGET',
  REMOVE_WIDGET: 'REMOVE_WIDGET',
  UPDATE_LAYOUT: 'UPDATE_LAYOUT',
  UPDATE_WIDGET_CONFIG: 'UPDATE_WIDGET_CONFIG',
  LOAD_DASHBOARD: 'LOAD_DASHBOARD',
  RESET_DASHBOARD: 'RESET_DASHBOARD'
};

// Default widgets configuration
const defaultWidgets = [
  {
    i: 'funnel-chart',
    x: 0,
    y: 5,
    w: 12,
    h: 6,
    type: 'funnel',
    title: 'Conversion Funnel',
    config: {}
  }
];

// Reducer function
const dashboardReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.ADD_WIDGET:
      return {
        ...state,
        widgets: [...state.widgets, action.payload]
      };
    
    case ACTIONS.REMOVE_WIDGET:
      return {
        ...state,
        widgets: state.widgets.filter(widget => widget.i !== action.payload)
      };
    
    case ACTIONS.UPDATE_LAYOUT:
      return {
        ...state,
        widgets: state.widgets.map(widget => {
          const layoutItem = action.payload.find(item => item.i === widget.i);
          return layoutItem ? { ...widget, ...layoutItem } : widget;
        })
      };
    
    case ACTIONS.UPDATE_WIDGET_CONFIG:
      return {
        ...state,
        widgets: state.widgets.map(widget => 
          widget.i === action.payload.id 
            ? { ...widget, config: { ...widget.config, ...action.payload.config } }
            : widget
        )
      };
    
    case ACTIONS.LOAD_DASHBOARD:
      return action.payload;
    
    case ACTIONS.RESET_DASHBOARD:
      return { widgets: defaultWidgets };
    
    default:
      return state;
  }
};

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
};

export const DashboardProvider = ({ children }) => {
  const [state, dispatch] = useReducer(dashboardReducer, { widgets: defaultWidgets });

  // Load dashboard from localStorage on mount
  useEffect(() => {
    const savedDashboard = localStorage.getItem('dashboard-state');
    if (savedDashboard) {
      try {
        const parsedDashboard = JSON.parse(savedDashboard);
        dispatch({ type: ACTIONS.LOAD_DASHBOARD, payload: parsedDashboard });
      } catch (error) {
        console.error('Failed to load dashboard from localStorage:', error);
      }
    }
  }, []);

  // Save dashboard to localStorage when state changes
  useEffect(() => {
    localStorage.setItem('dashboard-state', JSON.stringify(state));
  }, [state]);

  const removeWidget = (widgetId) => {
    dispatch({ type: ACTIONS.REMOVE_WIDGET, payload: widgetId });
  };

  const updateLayout = (layout) => {
    dispatch({ type: ACTIONS.UPDATE_LAYOUT, payload: layout });
  };

  const updateWidgetConfig = (widgetId, config) => {
    dispatch({ 
      type: ACTIONS.UPDATE_WIDGET_CONFIG, 
      payload: { id: widgetId, config } 
    });
  };

  const resetDashboard = () => {
    dispatch({ type: ACTIONS.RESET_DASHBOARD });
  };

  return (
    <DashboardContext.Provider 
      value={{
        ...state,
        removeWidget,
        updateLayout,
        updateWidgetConfig,
        resetDashboard
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};
