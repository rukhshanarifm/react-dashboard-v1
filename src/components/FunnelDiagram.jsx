import React, { useState } from 'react';
import { 
  ResponsiveContainer, 
  Funnel, 
  FunnelChart, 
  Tooltip, 
  LabelList, 
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  LineChart,
  Line,
  Area,
  AreaChart
} from 'recharts';
import { TrendingDown, Users, UserCheck, CreditCard, ArrowRight, BarChart3, TrendingUp, Layers } from 'lucide-react';
import Widget from './Widget';
import { funnelData } from '../data/sampleData';

// Map icons to each stage
const iconMap = {
  'Website Visitors': Users,
  'Sign Ups': UserCheck,
  'Active Users': TrendingDown,
  'Paying Customers': CreditCard
};

// Add icons to the funnel data
const initialData = funnelData.map(item => ({
  ...item,
  icon: iconMap[item.stage] || Users
}));

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    const prevValue = payload[0].payload.prevValue;
    const conversionRate = prevValue ? ((data.value / prevValue) * 100).toFixed(1) : 100;
    
    return (
      <div style={{
        background: 'white',
        padding: '12px 16px',
        border: '1px solid #e5e7eb',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
      }}>
        <p style={{ fontWeight: 'bold', marginBottom: '4px', color: data.fill }}>
          {data.stage}
        </p>
        <p style={{ fontSize: '14px', color: '#6b7280' }}>
          Count: <strong style={{ color: '#111827' }}>{data.value.toLocaleString()}</strong>
        </p>
        {prevValue && (
          <p style={{ fontSize: '14px', color: '#6b7280' }}>
            Conversion: <strong style={{ color: '#10b981' }}>{conversionRate}%</strong>
          </p>
        )}
      </div>
    );
  }
  return null;
};

export default function FunnelDiagram({ id, title, config }) {
  const [viewType, setViewType] = useState('funnel'); // 'funnel', 'bar', 'waterfall', 'area'
  const [data] = useState(initialData.map((item, index) => ({
    ...item,
    prevValue: index > 0 ? initialData[index - 1].value : null,
    dropOff: index > 0 ? initialData[index - 1].value - item.value : 0,
    conversionRate: index > 0 ? ((item.value / initialData[index - 1].value) * 100).toFixed(1) : 100
  })));
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const handleClick = (entry, index) => {
    setSelectedIndex(selectedIndex === index ? null : index);
  };

  const calculateConversionRate = (currentValue, prevValue) => {
    if (!prevValue) return null;
    return ((currentValue / prevValue) * 100).toFixed(1);
  };

  const renderChart = () => {
    switch (viewType) {
      case 'funnel':
        return (
          <ResponsiveContainer width="100%" height="100%">
            <FunnelChart>
              <Tooltip content={<CustomTooltip />} />
              <Funnel
                dataKey="value"
                data={data}
                isAnimationActive={true}
                onClick={handleClick}
                onMouseEnter={(entry, index) => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.fill}
                    stroke={selectedIndex === index ? '#1f2937' : 'transparent'}
                    strokeWidth={selectedIndex === index ? 3 : 0}
                    style={{
                      filter: hoveredIndex === index || selectedIndex === index 
                        ? 'brightness(1.1)' 
                        : 'brightness(1)',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease'
                    }}
                  />
                ))}
                <LabelList 
                  position="inside" 
                  fill="white" 
                  stroke="none"
                  dataKey="value"
                  formatter={(value) => value.toLocaleString()}
                  style={{ fontSize: '14px', fontWeight: 'bold' }}
                />
              </Funnel>
            </FunnelChart>
          </ResponsiveContainer>
        );

      case 'bar':
        return (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis 
                dataKey="stage" 
                tick={{ fontSize: 11 }}
                angle={-15}
                textAnchor="end"
                height={60}
              />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="value" onClick={handleClick}>
                {data.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.fill}
                    style={{ cursor: 'pointer' }}
                  />
                ))}
                <LabelList 
                  dataKey="conversionRate" 
                  position="top" 
                  formatter={(value) => value !== 100 ? `${value}%` : ''}
                  style={{ fontSize: '11px', fill: '#6b7280' }}
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        );

      case 'waterfall':
        const waterfallData = data.map((item, index) => ({
          ...item,
          start: index > 0 ? data[index - 1].value : 0,
          end: item.value,
          diff: index > 0 ? -(data[index - 1].value - item.value) : item.value
        }));

        return (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={waterfallData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis 
                dataKey="stage" 
                tick={{ fontSize: 11 }}
                angle={-15}
                textAnchor="end"
                height={60}
              />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="value" stackId="a" onClick={handleClick}>
                {waterfallData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.fill}
                    style={{ cursor: 'pointer' }}
                  />
                ))}
                <LabelList 
                  dataKey="value" 
                  position="top" 
                  formatter={(value) => value.toLocaleString()}
                  style={{ fontSize: '11px', fill: '#374151' }}
                />
              </Bar>
              {waterfallData.map((entry, index) => (
                index > 0 && (
                  <Bar 
                    key={`drop-${index}`}
                    dataKey={() => 0}
                    fill="transparent"
                  />
                )
              ))}
            </BarChart>
          </ResponsiveContainer>
        );

      case 'area':
        return (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis 
                dataKey="stage" 
                tick={{ fontSize: 11 }}
                angle={-15}
                textAnchor="end"
                height={60}
              />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip content={<CustomTooltip />} />
              <Area 
                type="monotone" 
                dataKey="value" 
                stroke="#3b82f6" 
                strokeWidth={3}
                fillOpacity={1} 
                fill="url(#colorValue)"
                onClick={handleClick}
                style={{ cursor: 'pointer' }}
              />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="#1e40af" 
                strokeWidth={2}
                dot={{ fill: '#3b82f6', r: 6, cursor: 'pointer' }}
              />
            </AreaChart>
          </ResponsiveContainer>
        );

      default:
        return null;
    }
  };

  return (
    <Widget id={id} title={title || 'Conversion Funnel'}>
      <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
        {/* View Type Toggle */}
        <div style={{ 
          display: 'flex', 
          gap: '8px', 
          marginBottom: '12px',
          flexWrap: 'wrap'
        }}>
          {[
            { type: 'funnel', label: 'Funnel', icon: Layers },
            { type: 'bar', label: 'Bar Chart', icon: BarChart3 },
            { type: 'waterfall', label: 'Waterfall', icon: TrendingDown },
            { type: 'area', label: 'Area Chart', icon: TrendingUp }
          ].map(({ type, label, icon: Icon }) => (
            <button
              key={type}
              onClick={() => {
                console.log('Switching to view type:', type);
                setViewType(type);
              }}
              style={{
                padding: '6px 12px',
                background: viewType === type ? '#3b82f6' : '#f3f4f6',
                color: viewType === type ? 'white' : '#374151',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '12px',
                fontWeight: '500',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                transition: 'all 0.2s ease'
              }}
            >
              <Icon size={14} />
              {label}
            </button>
          ))}
        </div>

        {/* Current View Type Indicator */}
        <div style={{ 
          fontSize: '12px', 
          color: '#6b7280', 
          marginBottom: '8px',
          fontWeight: '500'
        }}>
          Current View: {viewType.charAt(0).toUpperCase() + viewType.slice(1)} Chart
        </div>

        {/* Chart Container */}
        <div style={{ flex: 1, minHeight: '250px', marginBottom: '16px' }}>
          {renderChart()}
        </div>



        {/* Stats Summary */}
        <div style={{ 
          marginTop: '16px', 
          padding: '12px',
          background: '#f9fafb',
          borderRadius: '8px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
          gap: '8px'
        }}>
          {data.map((item, index) => {
            const Icon = item.icon;
            const conversionRate = calculateConversionRate(item.value, item.prevValue);
            const isSelected = selectedIndex === index;
            
            return (
              <div
                key={index}
                onClick={() => handleClick(item, index)}
                style={{
                  padding: '8px',
                  background: isSelected ? item.fill : 'white',
                  color: isSelected ? 'white' : '#374151',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  border: `2px solid ${isSelected ? item.fill : '#e5e7eb'}`,
                  transition: 'all 0.2s ease',
                  fontSize: '12px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '4px' }}>
                  <Icon size={14} />
                  <span style={{ fontWeight: '600', fontSize: '11px' }}>{item.stage}</span>
                </div>
                <div style={{ fontWeight: 'bold', fontSize: '16px' }}>
                  {item.value.toLocaleString()}
                </div>
                {conversionRate && (
                  <div style={{ 
                    fontSize: '10px', 
                    marginTop: '2px',
                    opacity: isSelected ? 1 : 0.7,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '2px'
                  }}>
                    <ArrowRight size={10} />
                    {conversionRate}% conversion
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Selected Stage Details */}
        {selectedIndex !== null && (
          <div style={{
            marginTop: '12px',
            padding: '12px',
            background: data[selectedIndex].fill,
            color: 'white',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: '500',
            textAlign: 'center',
            animation: 'fadeIn 0.3s ease'
          }}>
            {data[selectedIndex].stage}: {data[selectedIndex].value.toLocaleString()} users
            {selectedIndex > 0 && (
              <span style={{ marginLeft: '8px', opacity: 0.9 }}>
                ({((data[selectedIndex].value / data[0].value) * 100).toFixed(1)}% of total)
              </span>
            )}
          </div>
        )}
      </div>
    </Widget>
  );
}
