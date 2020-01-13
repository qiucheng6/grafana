import React, { PureComponent } from 'react';
import { PanelOptionsGrid, PanelOptionsGroup } from '@grafana/ui';
import { ValueMappingsEditor, FieldDisplayEditor, FieldPropertiesEditor } from '@grafana/ui/src/editors';
import { ValueMapping, FieldConfig, PanelEditorProps } from '@grafana/data';

import { PieChartOptionsBox } from './PieChartOptionsBox';
import { PieChartOptions } from './types';
import { FieldDisplayOptions } from '@grafana/data/src/field';

export class PieChartPanelEditor extends PureComponent<PanelEditorProps<PieChartOptions>> {
  onValueMappingsChanged = (mappings: ValueMapping[]) => {
    const current = this.props.options.fieldOptions.defaults;
    this.onDefaultsChange({
      ...current,
      mappings,
    });
  };

  onDisplayOptionsChanged = (fieldOptions: FieldDisplayOptions) =>
    this.props.onOptionsChange({
      ...this.props.options,
      fieldOptions,
    });

  onDefaultsChange = (field: FieldConfig) => {
    this.onDisplayOptionsChanged({
      ...this.props.options.fieldOptions,
      defaults: field,
    });
  };

  render() {
    const { onOptionsChange, options, data } = this.props;
    const { fieldOptions } = options;
    const { defaults } = fieldOptions;

    return (
      <>
        <PanelOptionsGrid>
          <PanelOptionsGroup title="Display">
            <FieldDisplayEditor onChange={this.onDisplayOptionsChanged} value={fieldOptions} />
          </PanelOptionsGroup>

          <PanelOptionsGroup title="Field (default)">
            <FieldPropertiesEditor showMinMax={true} onChange={this.onDefaultsChange} value={defaults} />
          </PanelOptionsGroup>

          <PieChartOptionsBox data={data} onOptionsChange={onOptionsChange} options={options} />
        </PanelOptionsGrid>

        <ValueMappingsEditor onChange={this.onValueMappingsChanged} valueMappings={defaults.mappings} />
      </>
    );
  }
}
