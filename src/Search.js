/* eslint-disable no-use-before-define */
import React from 'react';
import Chip from '@material-ui/core/Chip';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Button from '@material-ui/core/Button';

export default function FixedTags() {
  const fixedOptions = [];
  const [value, setValue] = React.useState([...fixedOptions, Keywords[0], Keywords[1]]);

  function getSearchResults(keywords) {
    for (let i = 0; i < keywords.length; i++) {
        console.log(keywords[i].title);
        let keyword = keywords[i].title;

        if (keyword === "Racism") {
            // show racist posts
        } else if (keyword === "LGBT") {
            
        } else if (keyword === "Pizza") {
            
        } else if (keyword === "Politics") {
            
        } else if (keyword === "Fat") {
            
        } 
    }
  }

  return (
    <div>
    <Autocomplete
      multiple
      id="fixed-tags-demo"
      value={value}
      onChange={(event, newValue) => {
        setValue([
          ...fixedOptions,
          ...newValue.filter((option) => fixedOptions.indexOf(option) === -1),
        ]);
        getSearchResults(newValue);
      }}
      options={Keywords}
      getOptionLabel={(option) => option.title}
      renderTags={(tagValue, getTagProps) =>
        tagValue.map((option, index) => (
          <Chip color="primary"
            label={option.title}
            {...getTagProps({ index })}
            disabled={fixedOptions.indexOf(option) !== -1}
          />
        ))
      }
      style={{ width: 500 }}
      renderInput={(params) => (
        <TextField {...params} label="Search posts for the following topics:" variant="outlined" placeholder="Enter your keywords here..." />
      )}
    />
    {/* <Button 
        variant="contained" 
        color="primary"
        // onClick=
    >Search</Button> */}
    </div>
  );
}

const Keywords = [
  { title: 'Racism' },
  { title: 'LGBT' },
  { title: 'Politics' },
  { title: 'Pizza' },
  { title: 'Fat' },
];
