import React, { useEffect, useState } from 'react';
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
  ListSubheader,
  CircularProgress,
  TextField,
  Divider,
  IconButton,
  Chip,
} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { set } from 'lodash';


const MAX_CHECKBOX_ITEMS = 5;

const CustomInputMenuItem = React.forwardRef(({ children, ...props }, ref) => (
  <MenuItem
    {...props}
    ref={ref}
    disableRipple
    disableTouchRipple
    style={{ cursor: 'default' }}
    onClick={(e) => e.stopPropagation()}
  >
    {children}
  </MenuItem>
));

const ensureArray = (value) => {
  if (!value) return [];
  return Array.isArray(value) ? value : [value];
};

const SectionSix = ({ row, viewProject, onSelectedValuesChange, onSelectedViewValuesChange }) => {
  const [options, setOptions] = useState({});
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedValues, setSelectedValues] = useState({});
  const [viewValues, setViewValues] = useState({});
  const [newTechnology, setNewTechnology] = useState("");
  const [activeCategory, setActiveCategory] = useState("");

  const inputs = [
    { key: 'sdlc_improvement', labels: 'Select SDLC Improvement Tools' },
    { key: 'agentic_ai_platforms', labels: 'Select Agentic AI Platforms' },
    { key: 'workflow_automation_tools', labels: 'Select Workflow Automation Tools' },
    { key: 'enterprise_genai_platforms', labels: 'Select Enterprise GenAI Platforms' },
  ];

  const handleAddCustomTechnology = (key) => {
    if (!newTechnology.trim()) return;

    if (viewProject) {
      setViewValues((prev) => {
        const arr = prev[key] || [];
        const updated = { ...prev, [key]: [...arr, newTechnology.trim()] };
        onSelectedViewValuesChange?.(updated);
        return updated;
      });
    } else {
      setSelectedValues((prev) => {
        const arr = prev[key] || [];
        const updated = { ...prev, [key]: [...arr, newTechnology.trim()] };
        onSelectedValuesChange?.(updated);
        return updated;
      });
    }
    setNewTechnology("");
    setActiveCategory("");
  };

  const handleToggle = (key, item) => {
    if (viewProject) {
      setViewValues((prev) => {
        const arr = prev[key] || [];
        const updatedArr = arr.includes(item)
          ? arr.filter((v) => v !== item)
          : [...arr, item];
        const updated = { ...prev, [key]: updatedArr };
        onSelectedViewValuesChange?.(updated);
        return updated;
      });
    } else {
      setSelectedValues((prev) => {
        const arr = prev[key] || [];
        const updatedArr = arr.includes(item)
          ? arr.filter((v) => v !== item)
          : [...arr, item];
        const updated = { ...prev, [key]: updatedArr };
        onSelectedValuesChange?.(updated);
        return updated;
      });
    }
  };

  const filterItems = (arr) =>
    arr.filter((item) =>
      item.toLowerCase().includes(searchTerm.toLowerCase())
    );
  
  const DEFAULT_GENAI_TOOLS = {
    sdlc_improvement: [
      'GitHub Copilot',
      'Cursor IDE',
      'Amazon CodeWhisperer',
      'TabNine',
      'Tabnine AI'
    ],
    agentic_ai_platforms: [
      'AutoGPT',
      'LangChain',
      'Microsoft Semantic Kernel',
      'OpenAI Assistants API',
      'Anthropic Claude API'
    ],
    workflow_automation_tools: [
      'Power Automate',
      'Zapier',
      'Microsoft Flow',
      'UiPath',
      'Automation Anywhere'
    ],
    enterprise_genai_platforms: [
      'Azure OpenAI Service',
      'AWS Bedrock',
      'Google Vertex AI',
      'Anthropic Claude Enterprise',
      'IBM watsonx'
    ]
  };

  useEffect(() => {
    const fetchAll = async () => {
      try {
        setOptions(DEFAULT_GENAI_TOOLS);
        const results = await Promise.all(
          inputs.map((input) =>
            fetch(
              `https://intranet.accionlabs.com/pmoreporting/platform_data/column_dropdown?dropdown_type=${input.key}`
            ).then((r) => r.json())
          )
        );
        const dataObj = {};
        inputs.forEach((input, idx) => {
          const apiValues = results[idx]?.values;
          dataObj[input.key] = results[idx]?.values.length > 0 
          ? apiValues
          : DEFAULT_GENAI_TOOLS[input.key] || [];
        });
        setOptions(dataObj);
      } catch (err) {
        console.error("Error fetching dropdowns:", err);
        setOptions(DEFAULT_GENAI_TOOLS);
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  useEffect(() => {
    if (viewProject) {
      const initial = {};
      inputs.forEach(({ key }) => {
        initial[key] = row[key] || [];
      });
      setViewValues(initial);
    }
  }, [viewProject, row]);

  const allSelected = [
    ...new Set(
      Object.values(viewProject ? viewValues : selectedValues).flat()
    ),
  ];

  return (
    <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', marginTop: "15px" }}>
      <Box sx={{ display: 'flex', flex: 1, flexWrap: 'wrap', alignItems: 'center' }}>
        <Box sx={{ width: 625 }}>
          <FormControl fullWidth>
            <InputLabel>AI and Automation Tools</InputLabel>
            {loading ? (
              <CircularProgress size={24} />
            ) : (
              <Select
                multiple
                value={allSelected}
                renderValue={(selectedVals) => selectedVals.join(", ")}
                MenuProps={{
                  PaperProps: {
                    style: { maxHeight: 400, width: 400 },
                  },
                }}
              >
                <CustomInputMenuItem>
                  <TextField
                    size="small"
                    fullWidth
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => {
                      e.stopPropagation();
                      setSearchTerm(e.target.value);
                    }}
                    onClick={(e) => e.stopPropagation()}
                  />
                </CustomInputMenuItem>

                <Divider />

                {inputs.map((input) => {
                  const filteredItems = filterItems(options[input.key] || []);
                  const currentValues = viewProject
                    ? viewValues[input.key] || []
                    : selectedValues[input.key] || [];

                  const checkboxItems = filteredItems.slice(0, MAX_CHECKBOX_ITEMS);
                  const remainingCount = filteredItems.length - MAX_CHECKBOX_ITEMS;

                  return (
                    <React.Fragment key={input.key}>
                      <ListSubheader sx={{ bgcolor: "#f5f5f5" }}>
                        {input.labels}
                      </ListSubheader>

                      {!viewProject && (
                        <CustomInputMenuItem>
                          <Box sx={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            gap: 1,
                            width: '100%',
                            px: 1 
                          }}>
                            <TextField
                              size="small"
                              fullWidth
                              placeholder="Add custom tool..."
                              value={activeCategory === input.key ? newTechnology : ''}
                              onChange={(e) => {
                                e.stopPropagation();
                                setActiveCategory(input.key);
                                setNewTechnology(e.target.value);
                              }}
                              onKeyDown={(e) => {
                                e.stopPropagation();
                                if (e.key === 'Enter') {
                                  e.preventDefault();
                                  handleAddCustomTechnology(input.key);
                                }
                              }}
                              onClick={(e) => e.stopPropagation()}
                            />
                            <IconButton
                              size="small"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleAddCustomTechnology(input.key);
                              }}
                            >
                              <AddIcon />
                            </IconButton>
                          </Box>
                        </CustomInputMenuItem>
                      )}

                      {checkboxItems.map((item) => (
                        <MenuItem
                          key={`${input.key}:${item}`}
                          value={item}
                          onClick={() => handleToggle(input.key, item)}
                        >
                          <Checkbox checked={ensureArray(currentValues).includes(item)} />
                          <ListItemText primary={item} />
                        </MenuItem>
                      ))}

                      {ensureArray(currentValues)
                        .filter(item => !options[input.key]?.includes(item))
                        .map((item) => (
                          <MenuItem
                            key={`${input.key}:${item}`}
                            value={item}
                            onClick={() => handleToggle(input.key, item)}
                          >
                            <Checkbox checked={true} />
                            <ListItemText 
                              primary={
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                  {item}
                                  <Chip 
                                    size="small" 
                                    label="Custom" 
                                    color="primary"
                                    sx={{ ml: 1, height: 20 }}
                                  />
                                </Box>
                              }
                            />
                          </MenuItem>
                        ))}

                      {filteredItems.length === 0 && ensureArray(currentValues).length === 0 && (
                        <MenuItem disabled>
                          <em>No items available</em>
                        </MenuItem>
                      )}
                    </React.Fragment>
                  );
                })}
              </Select>
            )}
          </FormControl>
        </Box>
      </Box>
    </div>
  );
};

export default SectionSix;