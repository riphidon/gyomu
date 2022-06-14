import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
} from '@angular/core';
import {
    ValidatorFn,
    AbstractControl,
    ValidationErrors,
    FormGroup,
    FormControl,
} from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';

function tagExists(list: string[]): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        let exists: boolean = false;
        const index = list.findIndex((e) => e === control.value);
        if (index !== -1) {
            exists = true;
        }
        return exists ? { tagExists: true } : null;
    };
}

@Component({
    selector: 'app-tags-box',
    templateUrl: './tags-box.component.html',
    styleUrls: ['./tags-box.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TagsBoxComponent implements OnInit {
    @Input() tags: string[] = [];

    @Output() tagLisUpdater = new EventEmitter<string[]>();

    editableTags: string[] = [];

    tagForm = new FormGroup({
        newTag: new FormControl(''),
    });

    constructor() {}

    ngOnInit(): void {
        // Work with copy here to be able to mutate object.
        this.editableTags = [...this.tags];
        // Set validators with editableTags once instanciated with tags values from input.
        this.tagForm.controls['newTag'].setValidators(
            tagExists(this.editableTags)
        );
    }

    // Add tag.
    add(event: MatChipInputEvent): void {
        const value = (event.value || '').trim();
        // If tag exists return.
        if (this.tagForm.controls['newTag'].errors?.['tagExists']) {
            return;
        }
        if (value) {
            let tag: string = value;
            this.editableTags.push(tag);
            this.tagLisUpdater.emit(this.editableTags);
        }
        // Clear the input value
        event.chipInput!.clear();
        this.tagForm.controls['newTag'].setValue(null);
    }

    // Remove tag.
    remove(t: string): void {
        const index = this.editableTags.findIndex((e) => e === t);
        if (index !== -1) {
            this.editableTags.splice(index, 1);
            this.tagLisUpdater.emit(this.editableTags);
        }
    }
}
